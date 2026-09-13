import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export type Story = {
  title: string;
  category: string;
  year: string;
  station: string;
  market: string;
  thumbnail: string;
  link: string;
};

const CARD_W = 1.9;
const CARD_H = CARD_W * (9 / 16);
const COLS = 5;
const RADIUS = 7;
const ARC = Math.PI * 0.46;

export const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

type Placed = Story & { col: number; row: number; rows: number };

const Card = ({
  story,
  onSelect,
  onHover,
}: {
  story: Placed;
  onSelect: (s: Story) => void;
  onHover: (s: Story | null) => void;
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(story.thumbnail);

  texture.colorSpace = THREE.SRGBColorSpace;

  const { position, rotationY } = useMemo(() => {
    const t = COLS > 1 ? story.col / (COLS - 1) : 0.5;
    const angle = (t - 0.5) * ARC;
    const yGap = CARD_H + 0.42;
    const yCentre = (story.rows - 1) / 2;
    return {
      position: new THREE.Vector3(
        Math.sin(angle) * RADIUS,
        (yCentre - story.row) * yGap,
        Math.cos(angle) * RADIUS - RADIUS,
      ),
      rotationY: -angle,
    };
  }, [story.col, story.row, story.rows]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const bob = Math.sin(state.clock.elapsedTime * 0.6 + story.col * 1.7 + story.row) * 0.045;
    const targetZ = position.z + bob + (hovered ? 0.55 : 0);
    const targetScale = hovered ? 1.06 : 1;
    mesh.current.position.z = THREE.MathUtils.damp(mesh.current.position.z, targetZ, 6, delta);
    const s = THREE.MathUtils.damp(mesh.current.scale.x, targetScale, 8, delta);
    mesh.current.scale.setScalar(s);
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(story);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
        document.body.style.cursor = "";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(story);
      }}
    >
      <planeGeometry args={[CARD_W, CARD_H]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};

const Wall = ({
  stories,
  onSelect,
  onHover,
  dragRef,
}: {
  stories: Placed[];
  onSelect: (s: Story) => void;
  onHover: (s: Story | null) => void;
  dragRef: React.MutableRefObject<{ target: number; current: number; dragging: boolean }>;
}) => {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    const d = dragRef.current;
    if (!d.dragging) d.target += delta * 0.045;
    d.current = THREE.MathUtils.damp(d.current, d.target, 4, delta);
    group.current.rotation.y = d.current + pointer.x * 0.12;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.06, 4, delta);
  });

  return (
    <group ref={group}>
      {stories.map((s) => (
        <Card key={s.link + s.row + s.col} story={s} onSelect={onSelect} onHover={onHover} />
      ))}
    </group>
  );
};

export const StoryWall = ({
  stories,
  onSelect,
  fallback,
}: {
  stories: Story[];
  onSelect: (s: Story) => void;
  fallback: React.ReactNode;
}) => {
  const [supported] = useState(hasWebGL);
  const [hovered, setHovered] = useState<Story | null>(null);
  const dragRef = useRef({ target: 0, current: 0, dragging: false });
  const last = useRef(0);

  const placed = useMemo<Placed[]>(() => {
    const rows = Math.ceil(stories.length / COLS);
    return stories.map((s, i) => ({
      ...s,
      col: i % COLS,
      row: Math.floor(i / COLS),
      rows,
    }));
  }, [stories]);

  if (!supported) return <>{fallback}</>;

  return (
    <div className="story-wall">
      <style>{`
        .story-wall {
          position: relative;
          width: 100%;
          height: min(78vh, 44rem);
          touch-action: pan-y;
          cursor: grab;
        }
        .story-wall[data-dragging="true"] { cursor: grabbing; }
        .story-wall__caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding: 1rem 1.5rem 0;
          pointer-events: none;
          text-align: center;
          transition: opacity 0.25s ease;
        }
        .story-wall__meta {
          font-size: 0.6875rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          opacity: 0.55;
        }
        .story-wall__title { font-size: 1.125rem; }
        @media (prefers-reduced-motion: reduce) {
          .story-wall__caption { transition: none; }
        }
      `}</style>

      <div
        style={{ position: "absolute", inset: 0 }}
        data-dragging={dragRef.current.dragging ? "true" : "false"}
        onPointerDown={(e) => {
          dragRef.current.dragging = true;
          last.current = e.clientX;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!dragRef.current.dragging) return;
          dragRef.current.target += (e.clientX - last.current) * 0.004;
          last.current = e.clientX;
        }}
        onPointerUp={() => {
          dragRef.current.dragging = false;
        }}
        onPointerLeave={() => {
          dragRef.current.dragging = false;
          setHovered(null);
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 9], fov: 48 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <Wall stories={placed} onSelect={onSelect} onHover={setHovered} dragRef={dragRef} />
          </Suspense>
        </Canvas>
      </div>

      <div className="story-wall__caption" style={{ opacity: hovered ? 1 : 0 }}>
        <span className="story-wall__meta">
          {hovered ? `${hovered.station} · ${hovered.market} · ${hovered.year}` : " "}
        </span>
        <span className="story-wall__title">{hovered ? hovered.title : " "}</span>
      </div>
    </div>
  );
};

export default StoryWall;