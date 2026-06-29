import AVFoundation
import CoreMedia
import Foundation

enum UpscaleError: Error, CustomStringConvertible {
    case usage
    case noVideoTrack
    case cannotCreateCompositionTrack
    case cannotCreateExportSession
    case exportFailed(String)

    var description: String {
        switch self {
        case .usage:
            return "Usage: swift scripts/upscale-video.swift <input.mp4> <output.mp4> <width> <height>"
        case .noVideoTrack:
            return "Input does not contain a video track."
        case .cannotCreateCompositionTrack:
            return "Could not create an AV composition video track."
        case .cannotCreateExportSession:
            return "Could not create AVAssetExportSession."
        case .exportFailed(let message):
            return message
        }
    }
}

func positiveInt(_ value: String) -> Int? {
    guard let intValue = Int(value), intValue > 0 else { return nil }
    return intValue
}

func displaySize(for track: AVAssetTrack) -> CGSize {
    let transformed = CGRect(origin: .zero, size: track.naturalSize).applying(track.preferredTransform)
    return CGSize(width: abs(transformed.width), height: abs(transformed.height))
}

func renderTransform(for track: AVAssetTrack, outputSize: CGSize) -> CGAffineTransform {
    let inputSize = displaySize(for: track)
    let scale = min(outputSize.width / inputSize.width, outputSize.height / inputSize.height)
    let scaledSize = CGSize(width: inputSize.width * scale, height: inputSize.height * scale)
    let offset = CGPoint(
        x: (outputSize.width - scaledSize.width) / 2,
        y: (outputSize.height - scaledSize.height) / 2
    )

    var transform = track.preferredTransform
    let transformedRect = CGRect(origin: .zero, size: track.naturalSize).applying(transform)
    transform = transform.translatedBy(x: -transformedRect.origin.x, y: -transformedRect.origin.y)
    transform = transform.scaledBy(x: scale, y: scale)
    transform = transform.translatedBy(x: offset.x / scale, y: offset.y / scale)
    return transform
}

func upscale(inputPath: String, outputPath: String, width: Int, height: Int) async throws {
    let inputURL = URL(fileURLWithPath: inputPath)
    let outputURL = URL(fileURLWithPath: outputPath)
    let asset = AVURLAsset(url: inputURL)
    let duration = try await asset.load(.duration)
    let videoTracks = try await asset.loadTracks(withMediaType: .video)
    guard let sourceVideoTrack = videoTracks.first else { throw UpscaleError.noVideoTrack }

    let composition = AVMutableComposition()
    guard let compositionVideoTrack = composition.addMutableTrack(
        withMediaType: .video,
        preferredTrackID: kCMPersistentTrackID_Invalid
    ) else {
        throw UpscaleError.cannotCreateCompositionTrack
    }

    try compositionVideoTrack.insertTimeRange(
        CMTimeRange(start: .zero, duration: duration),
        of: sourceVideoTrack,
        at: .zero
    )

    let audioTracks = try await asset.loadTracks(withMediaType: .audio)
    if let sourceAudioTrack = audioTracks.first,
       let compositionAudioTrack = composition.addMutableTrack(
            withMediaType: .audio,
            preferredTrackID: kCMPersistentTrackID_Invalid
       ) {
        try compositionAudioTrack.insertTimeRange(
            CMTimeRange(start: .zero, duration: duration),
            of: sourceAudioTrack,
            at: .zero
        )
    }

    let outputSize = CGSize(width: width, height: height)
    let instruction = AVMutableVideoCompositionInstruction()
    instruction.timeRange = CMTimeRange(start: .zero, duration: duration)

    let layerInstruction = AVMutableVideoCompositionLayerInstruction(assetTrack: compositionVideoTrack)
    layerInstruction.setTransform(renderTransform(for: sourceVideoTrack, outputSize: outputSize), at: .zero)
    instruction.layerInstructions = [layerInstruction]

    let nominalFrameRate = try await sourceVideoTrack.load(.nominalFrameRate)
    let frameRate = nominalFrameRate > 0 ? nominalFrameRate : 30
    let videoComposition = AVMutableVideoComposition()
    videoComposition.renderSize = outputSize
    videoComposition.frameDuration = CMTime(value: 1, timescale: CMTimeScale(frameRate.rounded()))
    videoComposition.instructions = [instruction]

    if FileManager.default.fileExists(atPath: outputURL.path) {
        try FileManager.default.removeItem(at: outputURL)
    }

    guard let exportSession = AVAssetExportSession(asset: composition, presetName: AVAssetExportPresetHighestQuality) else {
        throw UpscaleError.cannotCreateExportSession
    }

    exportSession.outputURL = outputURL
    exportSession.outputFileType = .mp4
    exportSession.shouldOptimizeForNetworkUse = true
    exportSession.videoComposition = videoComposition

    await exportSession.export()

    if exportSession.status != .completed {
        let details = exportSession.error?.localizedDescription ?? "Unknown export error"
        throw UpscaleError.exportFailed("Export failed for \(inputPath): \(details)")
    }
}

let arguments = CommandLine.arguments
guard arguments.count == 5,
      let width = positiveInt(arguments[3]),
      let height = positiveInt(arguments[4]) else {
    fputs("\(UpscaleError.usage.description)\n", stderr)
    exit(2)
}

do {
    try await upscale(inputPath: arguments[1], outputPath: arguments[2], width: width, height: height)
} catch let error as UpscaleError {
    fputs("\(error.description)\n", stderr)
    exit(1)
} catch {
    fputs("\(error.localizedDescription)\n", stderr)
    exit(1)
}
