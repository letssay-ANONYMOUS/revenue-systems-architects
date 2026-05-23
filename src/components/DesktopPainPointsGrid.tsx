import SectionReveal from "@/components/SectionReveal";
import PainPointCard from "@/components/painpoints/PainPointCard";
import MissedCallVisual from "@/components/painpoints/visuals/MissedCallVisual";
import InstantReplyVisual from "@/components/painpoints/visuals/InstantReplyVisual";
import RemindersVisual from "@/components/painpoints/visuals/RemindersVisual";
import LighthouseVisual from "@/components/painpoints/visuals/LighthouseVisual";
import WorkflowNodesVisual from "@/components/painpoints/visuals/WorkflowNodesVisual";
import ConnectedToolsVisual from "@/components/painpoints/visuals/ConnectedToolsVisual";

const painPoints = [
  { pain: "Missed calls", solution: "AI answers every call", caption: "Every call. Every time. Instantly.", Visual: MissedCallVisual },
  { pain: "Slow responses", solution: "Instant voice & chat", caption: "Respond in seconds. Book more.", Visual: InstantReplyVisual },
  { pain: "No-show chaos", solution: "Automated reminders", caption: "Reduce no-shows. Increase show-ups.", Visual: RemindersVisual },
  { pain: "Weak web presence", solution: "Premium conversion site", caption: "Beautiful. Fast. Built to convert.", Visual: LighthouseVisual },
  { pain: "Manual admin", solution: "Automated workflows", caption: "Save time. Eliminate busywork.", Visual: WorkflowNodesVisual },
  { pain: "Fragmented tools", solution: "One connected system", caption: "All your tools. One intelligent hub.", Visual: ConnectedToolsVisual },
];

const DesktopPainPointsGrid = () => (
  <div className="hidden grid-cols-1 gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
    {painPoints.map((pp, i) => (
      <SectionReveal key={pp.pain} delay={i * 0.05}>
        <PainPointCard
          pain={pp.pain}
          solution={pp.solution}
          caption={pp.caption}
          visual={<pp.Visual />}
        />
      </SectionReveal>
    ))}
  </div>
);

export default DesktopPainPointsGrid;
