import { ReactNode, RefObject, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BLADE_COUNT = 80000;
const FIELD_X = 17;
const FIELD_Z_NEAR = 3.2;
const FIELD_Z_FAR = -11;

const DUSK = {
  sky: "#3d4470",
  fog: "#6f6386",
  grassRoot: "#16331f",
  grassTip: "#7cab5e",
  ground: "#142619",
  sun: "#ffc98c",
  ambient: "#b3a4c6",
};

const GRASS_VERTEX = /* glsl */ `
  uniform float uTime;
  attribute float aTint;
  varying float vHeight;
  varying float vTint;
  varying float vFogDepth;

  void main() {
    vHeight = uv.y;
    vTint = aTint;

    vec3 pos = position;
    pos.x *= mix(1.0, 0.14, uv.y); // taper blade toward tip

    vec4 world = instanceMatrix * vec4(pos, 1.0);

    // wind: two layered sines phased by blade position, bend grows with height^2
    float phase = world.x * 0.42 + world.z * 0.57 + aTint * 6.2831;
    float sway = sin(uTime * 1.45 + phase) + 0.45 * sin(uTime * 2.35 + phase * 1.7);
    float bend = sway * (0.085 + aTint * 0.05) * vHeight * vHeight;
    world.x += bend;
    world.z += cos(uTime * 1.05 + phase) * 0.045 * vHeight * vHeight;

    vec4 mvPosition = viewMatrix * modelMatrix * world;
    vFogDepth = -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const GRASS_FRAGMENT = /* glsl */ `
  uniform vec3 uRootColor;
  uniform vec3 uTipColor;
  uniform vec3 uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;
  varying float vHeight;
  varying float vTint;
  varying float vFogDepth;

  void main() {
    vec3 color = mix(uRootColor, uTipColor, pow(vHeight, 1.35));
    color *= 0.9 + vTint * 0.2;
    // warm dusk rim creeping down from the tips
    color += vec3(0.22, 0.13, 0.05) * pow(vHeight, 3.0) * 0.55;
    float fogFactor = smoothstep(uFogNear, uFogFar, vFogDepth);
    color = mix(color, uFogColor, fogFactor);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const GrassField = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.09, 1, 1, 3);
    geo.translate(0, 0.5, 0); // pivot at the root
    const tints = new Float32Array(BLADE_COUNT);
    for (let i = 0; i < BLADE_COUNT; i++) tints[i] = Math.random();
    geo.setAttribute("aTint", new THREE.InstancedBufferAttribute(tints, 1));
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: GRASS_VERTEX,
        fragmentShader: GRASS_FRAGMENT,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uRootColor: { value: new THREE.Color(DUSK.grassRoot) },
          uTipColor: { value: new THREE.Color(DUSK.grassTip) },
          uFogColor: { value: new THREE.Color(DUSK.fog) },
          uFogNear: { value: 6.5 },
          uFogFar: { value: 19 },
        },
      }),
    [],
  );

  // Place every blade once — wind lives entirely in the vertex shader,
  // so nothing touches the instances per frame.
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < BLADE_COUNT; i++) {
      dummy.position.set(
        (Math.random() * 2 - 1) * FIELD_X,
        0,
        FIELD_Z_FAR + Math.random() * (FIELD_Z_NEAR - FIELD_Z_FAR),
      );
      dummy.rotation.y = Math.random() * Math.PI;
      const height = 0.55 + Math.random() * 0.75;
      dummy.scale.set(0.8 + Math.random() * 0.5, height, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, BLADE_COUNT]}
      frustumCulled={false}
    />
  );
};

const GlassPanel = ({ copy }: { copy: ReactNode }) => (
  <Float speed={1.4} rotationIntensity={0.04} floatIntensity={0.18}>
    <group position={[0, 1.52, 2.35]}>
      <RoundedBox args={[4.7, 2.65, 0.16]} radius={0.11} smoothness={4}>
        <MeshTransmissionMaterial
          transmission={1}
          roughness={0.1}
          thickness={0.42}
          ior={1.42}
          chromaticAberration={0.04}
          anisotropicBlur={0.25}
          distortion={0.05}
          distortionScale={0.4}
          temporalDistortion={0.08}
          resolution={512}
          samples={4}
          color="#dfe8ff"
        />
      </RoundedBox>
      <Html position={[0, 0, 0.12]} center distanceFactor={5.4} style={{ pointerEvents: "none" }}>
        <div style={{ width: "560px" }}>{copy}</div>
      </Html>
    </group>
  </Float>
);

const CameraRig = ({ progressRef }: { progressRef: RefObject<number> }) => {
  const { camera } = useThree();
  useFrame(() => {
    const t = progressRef.current ?? 0;
    camera.position.set(
      Math.sin(t * Math.PI) * 0.35,
      THREE.MathUtils.lerp(1.7, 1.12, t),
      THREE.MathUtils.lerp(9.4, 5.7, t),
    );
    camera.lookAt(0, 1.35, 0);
  });
  return null;
};

const SunGlow = () => (
  <mesh position={[-14, 2.6, -26]}>
    <circleGeometry args={[4.2, 40]} />
    <meshBasicMaterial color={DUSK.sun} fog={false} transparent opacity={0.85} />
  </mesh>
);

interface NatureSceneProps {
  trackRef: RefObject<HTMLDivElement>;
  copy: ReactNode;
}

const NatureScene = ({ trackRef, copy }: NatureSceneProps) => {
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(true);

  // Pin the canvas viewport for the length of the track; the camera dolly
  // is driven by scroll progress read in CameraRig each frame.
  useEffect(() => {
    const track = trackRef.current;
    const pinned = pinRef.current;
    if (!track || !pinned) return;

    gsap.registerPlugin(ScrollTrigger);

    // Keep ScrollTrigger's pin in lockstep with Lenis smooth scrolling.
    const lenis = (window as typeof window & { __sterkLenis?: { on: (e: string, f: () => void) => void; off: (e: string, f: () => void) => void } }).__sterkLenis;
    const syncScrollTrigger = () => ScrollTrigger.update();
    lenis?.on("scroll", syncScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      pin: pinned,
      pinSpacing: false, // the track itself provides the scroll length
      // An ancestor (PageTransition) keeps filter/will-change styles, which
      // re-anchors position:fixed and breaks the default pin. Transform-based
      // pinning is immune and stays synced through the Lenis update hook.
      pinType: "transform",
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

  // Render on demand while the section is off-screen.
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
        aria-label="You go to nature. Our systems run your work."
        className="relative h-full w-full"
      >
        <Canvas
          dpr={[1, 1.75]}
          frameloop={active ? "always" : "demand"}
          camera={{ fov: 33, near: 0.1, far: 60, position: [0, 1.7, 9.4] }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <color attach="background" args={[DUSK.sky]} />
          <fog attach="fog" args={[DUSK.fog, 6.5, 22]} />
          <ambientLight color={DUSK.ambient} intensity={0.65} />
          <hemisphereLight args={[DUSK.sky, DUSK.ground, 0.55]} />
          <directionalLight color={DUSK.sun} intensity={1.5} position={[-9, 3.6, -6]} />
          <SunGlow />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -4]}>
            <planeGeometry args={[60, 40]} />
            <meshLambertMaterial color={DUSK.ground} />
          </mesh>
          <GrassField />
          <GlassPanel copy={copy} />
          <CameraRig progressRef={progressRef} />
        </Canvas>
      </section>
    </div>
  );
};

export default NatureScene;
