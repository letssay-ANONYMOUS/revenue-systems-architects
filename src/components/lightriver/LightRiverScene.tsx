import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LightRiverCopy } from "./LightRiverSection";

const HUB = new THREE.Vector3(1.85, 1.3, 0);
const BUNDLES = 6;
const STREAMS_PER_BUNDLE = 22;

const RIVER = {
  background: "#f6f9fe",
  fog: "#f3f7fd",
  deepBlue: "#1447d4",
  midBlue: "#2f74ff",
  paleBlue: "#9db9ff",
};

const STREAM_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uMouseStrength;
  attribute float aSeed;
  varying float vT;
  varying float vSeed;
  varying float vFogDepth;

  void main() {
    vT = uv.x;
    vSeed = aSeed;

    vec3 pos = position;

    // gentle ambient drift so the river never sits still
    pos.x += sin(uTime * 0.4 + aSeed * 6.2831 + uv.x * 9.0) * 0.06 * (1.0 - uv.x);
    pos.y += cos(uTime * 0.33 + aSeed * 4.71 + uv.x * 7.0) * 0.05 * (1.0 - uv.x);

    // cursor repulsion: streams bow away from the pointer
    vec2 away = pos.xy - uMouse.xy;
    float dist = length(away);
    float push = exp(-dist * dist * 0.55) * uMouseStrength;
    pos.xy += normalize(away + vec2(0.0001)) * push * 0.9 * (1.0 - uv.x * 0.85);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vFogDepth = -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const STREAM_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform vec3 uDeep;
  uniform vec3 uMid;
  uniform vec3 uPale;
  uniform vec3 uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;
  varying float vT;
  varying float vSeed;
  varying float vFogDepth;

  void main() {
    // traveling pulses flowing toward the hub (vT = 1 at the hub)
    float flow = fract(vT * 2.2 - uTime * 0.22 + vSeed);
    float pulse = smoothstep(0.0, 0.1, flow) * smoothstep(0.45, 0.1, flow);
    float flow2 = fract(vT * 5.5 - uTime * 0.43 + vSeed * 2.7);
    float sparkle = smoothstep(0.0, 0.05, flow2) * smoothstep(0.16, 0.05, flow2) * 0.6;

    float intensity = pulse + sparkle;
    vec3 color = mix(uPale, uMid, clamp(intensity, 0.0, 1.0));
    color = mix(color, uDeep, pulse * 0.75);

    // streams brighten as they near the hub, wake with scroll, and are
    // absorbed at the hub face instead of piercing through it
    float nearHub = smoothstep(0.15, 0.9, vT);
    float absorbed = smoothstep(1.0, 0.93, vT);
    float alpha = (0.16 + intensity * 0.7) * (0.45 + nearHub * 0.55) * absorbed * uReveal;

    float fogFactor = smoothstep(uFogNear, uFogFar, vFogDepth);
    alpha *= 1.0 - fogFactor * 0.9;

    gl_FragColor = vec4(color, alpha);
  }
`;

const buildStreamGeometry = () => {
  const geometries: THREE.BufferGeometry[] = [];
  const up = new THREE.Vector3(0, 1, 0);

  for (let b = 0; b < BUNDLES; b++) {
    const baseAngle = (b / BUNDLES) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    for (let s = 0; s < STREAMS_PER_BUNDLE; s++) {
      const angle = baseAngle + (Math.random() - 0.5) * 0.55;
      const startRadius = 15 + Math.random() * 5;
      const start = new THREE.Vector3(
        Math.cos(angle) * startRadius + HUB.x,
        HUB.y + (Math.random() - 0.5) * 7,
        Math.sin(angle) * startRadius * 0.5 - 1.5,
      );

      // braid: perpendicular sine offsets that tighten as streams approach the hub
      const dir = new THREE.Vector3().subVectors(HUB, start);
      const perp = new THREE.Vector3().crossVectors(dir, up).normalize();
      const phase = Math.random() * Math.PI * 2;
      const braid = 1.4 + Math.random() * 1.6;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= 4; i++) {
        const t = i / 4;
        const p = new THREE.Vector3().lerpVectors(start, HUB, t);
        const tighten = (1 - t) * (1 - t);
        p.addScaledVector(perp, Math.sin(t * Math.PI * 1.6 + phase) * braid * tighten);
        p.y += Math.sin(t * Math.PI + phase) * 0.8 * tighten;
        p.z += Math.cos(t * Math.PI * 1.3 + phase) * 0.7 * tighten;
        points.push(p);
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const radius = 0.012 + Math.random() * 0.02;
      const tube = new THREE.TubeGeometry(curve, 90, radius, 5, false);
      const vertexCount = tube.attributes.position.count;
      tube.setAttribute(
        "aSeed",
        new THREE.BufferAttribute(new Float32Array(vertexCount).fill(Math.random()), 1),
      );
      geometries.push(tube);
    }
  }

  const merged = mergeGeometries(geometries);
  geometries.forEach((g) => g.dispose());
  return merged;
};

const StreamField = ({ progressRef }: { progressRef: RefObject<number> }) => {
  const geometry = useMemo(buildStreamGeometry, []);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: STREAM_VERTEX,
        fragmentShader: STREAM_FRAGMENT,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uReveal: { value: 0 },
          uMouse: { value: new THREE.Vector3(0, 1.3, 0) },
          uMouseStrength: { value: 0 },
          uDeep: { value: new THREE.Color(RIVER.deepBlue) },
          uMid: { value: new THREE.Color(RIVER.midBlue) },
          uPale: { value: new THREE.Color(RIVER.paleBlue) },
          uFogColor: { value: new THREE.Color(RIVER.fog) },
          uFogNear: { value: 12 },
          uFogFar: { value: 26 },
        },
      }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  const mousePlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const mouseTarget = useMemo(() => new THREE.Vector3(0, 1.3, 0), []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    // streams wake up over the first half of the scroll, then hold
    const progress = progressRef.current ?? 0;
    material.uniforms.uReveal.value = THREE.MathUtils.lerp(
      material.uniforms.uReveal.value,
      0.35 + Math.min(progress * 2, 1) * 0.65,
      0.06,
    );

    // project the pointer onto the stream plane and ease toward it
    if (state.raycaster.ray.intersectPlane(mousePlane, mouseTarget)) {
      material.uniforms.uMouse.value.lerp(mouseTarget, 0.12);
      material.uniforms.uMouseStrength.value = THREE.MathUtils.lerp(
        material.uniforms.uMouseStrength.value,
        1,
        0.05,
      );
    }
  });

  return <mesh geometry={geometry} material={material} frustumCulled={false} />;
};

const GlassHub = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.y = state.clock.elapsedTime * 0.45;
    ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.35;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.22}>
      <group position={HUB}>
        <RoundedBox args={[2.5, 2.5, 0.34]} radius={0.16} smoothness={4}>
          <MeshTransmissionMaterial
            transmission={1}
            roughness={0.06}
            thickness={0.5}
            ior={1.45}
            chromaticAberration={0.05}
            anisotropicBlur={0.15}
            distortion={0.04}
            distortionScale={0.5}
            temporalDistortion={0.06}
            resolution={512}
            samples={4}
            color="#f2f7ff"
            background={new THREE.Color("#f6f9fe")}
          />
        </RoundedBox>
        <mesh ref={ringRef} position={[0, 0.1, 0]}>
          <torusGeometry args={[0.52, 0.014, 12, 64]} />
          <meshBasicMaterial color={RIVER.deepBlue} transparent opacity={0.55} />
        </mesh>
        <Html position={[0, -0.55, 0.2]} center distanceFactor={6} style={{ pointerEvents: "none" }}>
          <div style={{ width: "300px", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                letterSpacing: "0.26em",
                color: "rgba(7,16,31,0.78)",
                textTransform: "uppercase",
              }}
            >
              STERK.systems
            </p>
            <p
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 500,
                fontSize: "10.5px",
                letterSpacing: "0.3em",
                color: "rgba(7,16,31,0.46)",
                textTransform: "uppercase",
                marginTop: "6px",
              }}
            >
              One system. Everything handled.
            </p>
          </div>
        </Html>
      </group>
    </Float>
  );
};

const CameraRig = ({ progressRef }: { progressRef: RefObject<number> }) => {
  const { camera } = useThree();
  useFrame(() => {
    const t = progressRef.current ?? 0;
    camera.position.set(
      THREE.MathUtils.lerp(0, 0.6, t),
      THREE.MathUtils.lerp(1.5, 1.3, t),
      THREE.MathUtils.lerp(12.5, 8.4, t),
    );
    camera.lookAt(1.0, 1.3, 0);
  });
  return null;
};

interface LightRiverSceneProps {
  trackRef: RefObject<HTMLDivElement>;
}

const LightRiverScene = ({ trackRef }: LightRiverSceneProps) => {
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    const pinned = pinRef.current;
    if (!track || !pinned) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = (window as typeof window & { __sterkLenis?: { on: (e: string, f: () => void) => void; off: (e: string, f: () => void) => void } }).__sterkLenis;
    const syncScrollTrigger = () => ScrollTrigger.update();
    lenis?.on("scroll", syncScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      pin: pinned,
      pinSpacing: false,
      pinType: "transform", // see NatureScene: ancestor filter styles break fixed pinning
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });
    ScrollTrigger.refresh();
    return () => {
      lenis?.off("scroll", syncScrollTrigger);
      trigger.kill();
    };
  }, [trackRef]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    observer.observe(track);
    return () => observer.disconnect();
  }, [trackRef]);

  return (
    <div ref={pinRef} className="h-[100svh] w-full overflow-hidden">
      <section
        aria-label="Everything flows into one system."
        className="relative h-full w-full"
      >
        <Canvas
          dpr={[1, 1.75]}
          frameloop={active ? "always" : "demand"}
          camera={{ fov: 34, near: 0.1, far: 50, position: [0, 1.5, 12.5] }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <color attach="background" args={[RIVER.background]} />
          <fog attach="fog" args={[RIVER.fog, 12, 30]} />
          <ambientLight color="#ffffff" intensity={1.1} />
          <directionalLight color="#dce8ff" intensity={0.9} position={[4, 6, 6]} />
          <StreamField progressRef={progressRef} />
          <GlassHub />
          <CameraRig progressRef={progressRef} />
        </Canvas>

        {/* DOM copy overlay — crisp, selectable, SEO-visible */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
            <div className="relative w-fit">
              {/* soft veil so the headline stays legible over busy streams */}
              <div className="absolute -inset-12 rounded-[4rem] bg-[radial-gradient(ellipse_at_40%_50%,rgba(248,251,255,0.92)_0%,rgba(248,251,255,0.55)_55%,transparent_78%)] blur-xl" />
              <LightRiverCopy />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LightRiverScene;
