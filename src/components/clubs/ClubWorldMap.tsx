"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type * as THREE_NS from "three";
import type { RunningClub } from "@/data/runningClubs";

/** Palette : bleu de la navbar pour les terres, océan très clair. */
const LAND = "#4EA6F5";
const LAND_DARK = "#2E86D6";
const OCEAN = "#EAF4FE";
const GRATICULE = "#D4E7FA";
const MARKER_RING = "#1B5E96";

/** Bande de latitudes affichée : on écarte l'Antarctique, très déformé en équirectangulaire. */
const LAT_MAX = 84;
const LAT_MIN = -58;
const LAT_MID = (LAT_MAX + LAT_MIN) / 2;
const LAT_SPAN = LAT_MAX - LAT_MIN;

/** Plan équirectangulaire : 4 unités de large, hauteur déduite de la bande de latitudes. */
const MAP_W = 4;
const MAP_H = (MAP_W * LAT_SPAN) / 360;
/** Amplitude de la courbure (les bords s'éloignent vers l'arrière). */
const CURVE_X = 0.5;
const CURVE_Y = 0.22;

const FOV = 35;
const MIN_Z = 0.55;
const MAX_Z = 2.8;
const INITIAL_Z = 2.5;
/** En deçà de cette distance caméra, les étiquettes des clubs apparaissent. */
const LABEL_Z = 1.7;
/** Vue par défaut : Europe. */
const HOME = { x: 0.06, y: 0.32 };

export type WorldMapCopy = {
  hint: string;
  members: string;
  empty: string;
  zoomIn: string;
  zoomOut: string;
  reset: string;
  loading: string;
};

/** Profondeur du plan incurvé en un point (u, v) normalisés dans [-1, 1]. */
function curveZ(u: number, v: number) {
  return -(CURVE_X * u * u + CURVE_Y * v * v);
}

/** Latitude/longitude → point sur la carte incurvée. */
function latLngToMap(lat: number, lng: number) {
  const u = lng / 180;
  const v = (lat - LAT_MID) / (LAT_SPAN / 2);
  return { x: (u * MAP_W) / 2, y: (v * MAP_H) / 2, z: curveZ(u, v) };
}

type GeoFeature = {
  geometry: { type: string; coordinates: number[][][] | number[][][][] } | null;
};

/** Dessine la carte du monde en projection équirectangulaire dans un canvas. */
function drawWorld(canvas: HTMLCanvasElement, features: GeoFeature[]) {
  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = OCEAN;
  ctx.fillRect(0, 0, W, H);

  // Graticule tous les 20°
  ctx.strokeStyle = GRATICULE;
  ctx.lineWidth = Math.max(1, W / 2048);
  ctx.beginPath();
  for (let lng = -180; lng <= 180; lng += 20) {
    const x = ((lng + 180) / 360) * W;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
  }
  for (let lat = LAT_MIN + 20; lat < LAT_MAX; lat += 20) {
    const y = ((LAT_MAX - lat) / LAT_SPAN) * H;
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
  }
  ctx.stroke();

  const project = (lng: number, lat: number) => [
    ((lng + 180) / 360) * W,
    ((LAT_MAX - lat) / LAT_SPAN) * H,
  ];

  /** Rend les longitudes continues : sans ça, un pays à cheval sur l'antiméridien
   *  (Russie, Fidji…) trace une bande parasite d'un bord à l'autre de la carte. */
  function unwrap(ring: number[][]) {
    let previous: number | null = null;
    return ring.map(([lng, lat]) => {
      let value = lng;
      if (previous !== null) {
        while (value - previous > 180) value -= 360;
        while (previous - value > 180) value += 360;
      }
      previous = value;
      return [value, lat];
    });
  }

  function tracePolygon(rings: number[][][]) {
    const unwrapped = rings.map(unwrap);
    // Tracé répété de part et d'autre : le canvas se charge du découpage aux bords.
    for (const offset of [-360, 0, 360]) {
      ctx!.beginPath();
      for (const ring of unwrapped) {
        ring.forEach(([lng, lat], i) => {
          const [x, y] = project(lng + offset, lat);
          if (i === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        });
        ctx!.closePath();
      }
      ctx!.fill();
      ctx!.stroke();
    }
  }

  ctx.fillStyle = LAND;
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = Math.max(1.5, W / 1400);
  ctx.lineJoin = "round";

  for (const feature of features) {
    const geometry = feature.geometry;
    if (!geometry) continue;
    if (geometry.type === "Polygon") {
      tracePolygon(geometry.coordinates as number[][][]);
    } else if (geometry.type === "MultiPolygon") {
      for (const polygon of geometry.coordinates as number[][][][]) tracePolygon(polygon);
    }
  }
}

export function ClubWorldMap({
  clubs,
  tr,
  onSelect,
  selectedId,
}: {
  clubs: readonly RunningClub[];
  tr: WorldMapCopy;
  onSelect?: (club: RunningClub | null) => void;
  selectedId?: string | null;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState<RunningClub | null>(null);

  const apiRef = useRef<{ zoom: (factor: number) => void; reset: () => void } | null>(null);
  const clubsRef = useRef(clubs);
  const selectedIdRef = useRef(selectedId ?? null);
  const onSelectRef = useRef(onSelect);
  const syncMarkersRef = useRef<((clubs: readonly RunningClub[]) => void) | null>(null);
  const focusRef = useRef<((club: RunningClub) => void) | null>(null);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    clubsRef.current = clubs;
    syncMarkersRef.current?.(clubs);
  }, [clubs]);

  useEffect(() => {
    selectedIdRef.current = selectedId ?? null;
    if (!selectedId) return;
    const club = clubs.find((c) => c.id === selectedId);
    if (club) focusRef.current?.(club);
  }, [selectedId, clubs]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const [THREE, topojson, topology] = await Promise.all([
        import("three"),
        import("topojson-client"),
        fetch("/data/world-50m.json").then((r) => r.json()),
      ]);
      if (disposed || !mountRef.current) return;

      const geo = topojson.feature(topology, topology.objects.countries) as unknown as {
        features: GeoFeature[];
      };

      // Texture de la carte
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 4096;
      textureCanvas.height = Math.round((4096 * LAT_SPAN) / 360);
      drawWorld(textureCanvas, geo.features);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      renderer.domElement.style.touchAction = "pan-y";
      renderer.domElement.style.cursor = "grab";
      mount.appendChild(renderer.domElement);

      // Plan incurvé portant la carte
      const geometry = new THREE.PlaneGeometry(MAP_W, MAP_H, 240, 120);
      const position = geometry.attributes.position;
      for (let i = 0; i < position.count; i++) {
        const u = position.getX(i) / (MAP_W / 2);
        const v = position.getY(i) / (MAP_H / 2);
        position.setZ(i, curveZ(u, v));
      }
      position.needsUpdate = true;
      geometry.computeVertexNormals();

      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.generateMipmaps = true;

      const mapMesh = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ map: texture, transparent: true }),
      );
      scene.add(mapMesh);
      setReady(true);

      // Marqueurs
      const markerGroup = new THREE.Group();
      scene.add(markerGroup);

      const dotGeometry = new THREE.CircleGeometry(0.016, 24);
      const ringGeometry = new THREE.RingGeometry(0.016, 0.026, 28);
      const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const dotActiveMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(LAND_DARK) });
      const ringMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(MARKER_RING) });
      const ringActiveMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

      type Marker = {
        club: RunningClub;
        group: THREE_NS.Group;
        dot: THREE_NS.Mesh;
        ring: THREE_NS.Mesh;
      };
      let markers: Marker[] = [];

      function buildMarkers(list: readonly RunningClub[]) {
        for (const marker of markers) markerGroup.remove(marker.group);
        markers = list.map((club) => {
          const { x, y, z } = latLngToMap(club.lat, club.lng);
          const group = new THREE.Group();
          group.position.set(x, y, z + 0.012);

          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          const dot = new THREE.Mesh(dotGeometry, dotMaterial);
          dot.position.z = 0.001;
          group.add(ring, dot);
          markerGroup.add(group);
          return { club, group, dot, ring };
        });
      }
      buildMarkers(clubsRef.current);
      syncMarkersRef.current = buildMarkers;

      // ---- Navigation : pan à la souris, zoom molette centré sur le curseur ----
      const view = { x: HOME.x, y: HOME.y, z: INITIAL_Z };
      const target = { ...view };

      function visibleSize(z: number) {
        const height = 2 * z * Math.tan((FOV * Math.PI) / 360);
        return { height, width: height * camera.aspect };
      }

      function clampTarget() {
        target.z = Math.min(MAX_Z, Math.max(MIN_Z, target.z));
        const { width, height } = visibleSize(target.z);
        const maxX = Math.max(0, MAP_W / 2 - width / 2);
        const maxY = Math.max(0, MAP_H / 2 - height / 2);
        target.x = Math.min(maxX, Math.max(-maxX, target.x));
        target.y = Math.min(maxY, Math.max(-maxY, target.y));
      }

      let dragging = false;
      let moved = false;
      let lastX = 0;
      let lastY = 0;
      let pointer: { x: number; y: number } | null = null;
      let hoveredId: string | null = null;

      function onPointerDown(event: PointerEvent) {
        dragging = true;
        moved = false;
        lastX = event.clientX;
        lastY = event.clientY;
        renderer.domElement.setPointerCapture(event.pointerId);
        renderer.domElement.style.cursor = "grabbing";
      }

      function onPointerMove(event: PointerEvent) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };

        if (!dragging) return;
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
        lastX = event.clientX;
        lastY = event.clientY;

        const { height } = visibleSize(target.z);
        const perPixel = height / rect.height;
        target.x -= dx * perPixel;
        target.y += dy * perPixel;
        clampTarget();
      }

      function onPointerUp(event: PointerEvent) {
        if (dragging) renderer.domElement.releasePointerCapture(event.pointerId);
        dragging = false;
        renderer.domElement.style.cursor = hoveredId ? "pointer" : "grab";
        if (moved) return;
        const marker = pickMarker();
        onSelectRef.current?.(marker ? marker.club : null);
      }

      function onPointerLeave() {
        pointer = null;
        hoveredId = null;
        setHovered(null);
      }

      function onWheel(event: WheelEvent) {
        event.preventDefault();
        const rect = renderer.domElement.getBoundingClientRect();
        const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

        const before = visibleSize(target.z);
        const worldX = target.x + (nx * before.width) / 2;
        const worldY = target.y + (ny * before.height) / 2;

        const factor = Math.exp(event.deltaY * 0.0012);
        target.z = Math.min(MAX_Z, Math.max(MIN_Z, target.z * factor));

        // Le point sous le curseur reste sous le curseur.
        const after = visibleSize(target.z);
        target.x = worldX - (nx * after.width) / 2;
        target.y = worldY - (ny * after.height) / 2;
        clampTarget();
      }

      const canvas = renderer.domElement;
      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointerleave", onPointerLeave);
      canvas.addEventListener("wheel", onWheel, { passive: false });

      apiRef.current = {
        zoom: (factor) => {
          target.z = Math.min(MAX_Z, Math.max(MIN_Z, target.z * factor));
          clampTarget();
        },
        reset: () => {
          target.x = HOME.x;
          target.y = HOME.y;
          target.z = INITIAL_Z;
          onSelectRef.current?.(null);
        },
      };

      focusRef.current = (club) => {
        const { x, y } = latLngToMap(club.lat, club.lng);
        target.x = x;
        target.y = y;
        target.z = Math.min(target.z, 1.5);
        clampTarget();
      };

      // ---- Projection écran (survol, clic, étiquettes) ----
      const projected = new THREE.Vector3();

      function markerScreen(marker: Marker) {
        projected.copy(marker.group.position).project(camera);
        return {
          x: ((projected.x + 1) / 2) * canvas.clientWidth,
          y: ((1 - projected.y) / 2) * canvas.clientHeight,
          inside: Math.abs(projected.x) <= 1.05 && Math.abs(projected.y) <= 1.05,
        };
      }

      function pickMarker(): Marker | null {
        if (!pointer) return null;
        let best: Marker | null = null;
        let bestDistance = 18;
        for (const marker of markers) {
          const screen = markerScreen(marker);
          if (!screen.inside) continue;
          const distance = Math.hypot(screen.x - pointer.x, screen.y - pointer.y);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = marker;
          }
        }
        return best;
      }

      // ---- Redimensionnement ----
      function resize() {
        const width = mount!.clientWidth;
        const height = mount!.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        clampTarget();
      }
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);

      // ---- Boucle ----
      let frame = 0;
      /** Tailles d'étiquettes mesurées une fois (elles ne changent pas). */
      const labelSizes = new Map<string, { w: number; h: number }>();
      function animate() {
        frame = requestAnimationFrame(animate);

        // Interpolation douce vers la vue cible (zoom et déplacement fluides).
        view.x += (target.x - view.x) * 0.14;
        view.y += (target.y - view.y) * 0.14;
        view.z += (target.z - view.z) * 0.14;
        camera.position.set(view.x, view.y, view.z);
        camera.lookAt(view.x, view.y, curveZ(0, 0));

        if (pointer && !dragging) {
          const marker = pickMarker();
          const nextId = marker?.club.id ?? null;
          if (nextId !== hoveredId) {
            hoveredId = nextId;
            setHovered(marker?.club ?? null);
            canvas.style.cursor = marker ? "pointer" : "grab";
          }
        }

        const markerScale = Math.min(1.1, Math.max(0.26, view.z / INITIAL_Z));
        const showLabels = view.z < LABEL_Z;

        type Candidate = { marker: Marker; label: HTMLDivElement; x: number; y: number; active: boolean };
        const candidates: Candidate[] = [];

        for (const marker of markers) {
          const isActive = marker.club.id === selectedIdRef.current || marker.club.id === hoveredId;
          marker.dot.material = isActive ? dotActiveMaterial : dotMaterial;
          marker.ring.material = isActive ? ringActiveMaterial : ringMaterial;
          marker.group.scale.setScalar(isActive ? markerScale * 1.45 : markerScale);

          const label = labelRefs.current.get(marker.club.id);
          if (!label) continue;

          const screen = markerScreen(marker);
          if (!screen.inside || !(showLabels || isActive)) {
            label.style.opacity = "0";
            label.style.pointerEvents = "none";
            continue;
          }
          label.style.transform = `translate(-50%, -100%) translate(${screen.x}px, ${screen.y - 10}px)`;
          candidates.push({ marker, label, x: screen.x, y: screen.y - 10, active: isActive });
        }

        // Désencombrement : le club actif d'abord, puis les plus gros ; on masque ce qui se chevauche.
        candidates.sort((a, b) => {
          if (a.active !== b.active) return a.active ? -1 : 1;
          return b.marker.club.members - a.marker.club.members;
        });

        const placed: { left: number; right: number; top: number; bottom: number }[] = [];
        for (const candidate of candidates) {
          let size = labelSizes.get(candidate.marker.club.id);
          if (!size) {
            size = { w: candidate.label.offsetWidth, h: candidate.label.offsetHeight };
            if (size.w > 0) labelSizes.set(candidate.marker.club.id, size);
          }
          const box = {
            left: candidate.x - size.w / 2 - 3,
            right: candidate.x + size.w / 2 + 3,
            top: candidate.y - size.h - 3,
            bottom: candidate.y + 3,
          };
          const collides =
            !candidate.active &&
            placed.some(
              (other) =>
                box.left < other.right &&
                box.right > other.left &&
                box.top < other.bottom &&
                box.bottom > other.top,
            );

          if (collides) {
            candidate.label.style.opacity = "0";
            candidate.label.style.pointerEvents = "none";
            continue;
          }
          placed.push(box);
          candidate.label.style.opacity = "1";
          candidate.label.style.zIndex = candidate.active ? "3" : "2";
          candidate.label.style.pointerEvents = "auto";
        }

        renderer.render(scene, camera);
      }
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointerleave", onPointerLeave);
        canvas.removeEventListener("wheel", onWheel);
        syncMarkersRef.current = null;
        focusRef.current = null;
        apiRef.current = null;
        geometry.dispose();
        (mapMesh.material as THREE_NS.Material).dispose();
        texture.dispose();
        dotGeometry.dispose();
        ringGeometry.dispose();
        dotMaterial.dispose();
        dotActiveMaterial.dispose();
        ringMaterial.dispose();
        ringActiveMaterial.dispose();
        renderer.dispose();
        canvas.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  const handleLabelClick = useCallback(
    (club: RunningClub) => {
      onSelect?.(club);
    },
    [onSelect],
  );

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-zinc-200 bg-[#EAF4FE]">
      <div
        ref={mountRef}
        className="h-[clamp(18rem,44vw,32rem)] w-full"
        role="application"
        aria-label={tr.hint}
      />

      {/* Étiquettes projetées au-dessus du canvas */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {clubs.map((club) => (
          <div
            key={club.id}
            ref={(node) => {
              if (node) labelRefs.current.set(club.id, node);
              else labelRefs.current.delete(club.id);
            }}
            className="absolute left-0 top-0 opacity-0 transition-opacity duration-150 will-change-transform"
          >
            <button
              type="button"
              onClick={() => handleLabelClick(club)}
              className={[
                "whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold shadow-sm transition-colors",
                club.id === selectedId
                  ? "border-transparent bg-[#1B5E96] text-white"
                  : "border-white bg-white/95 text-zinc-800 hover:border-[#4EA6F5]",
              ].join(" ")}
            >
              {club.flag} {club.name}
            </button>
          </div>
        ))}
      </div>

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-zinc-500">
          {tr.loading}
        </div>
      )}

      <p className="pointer-events-none absolute left-4 top-4 rounded-full border border-white bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-sm sm:text-sm">
        {tr.hint}
      </p>

      {clubs.length === 0 && (
        <p className="pointer-events-none absolute inset-x-6 top-1/2 -translate-y-1/2 rounded-2xl bg-white/95 px-4 py-3 text-center text-sm font-medium text-zinc-600">
          {tr.empty}
        </p>
      )}

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => apiRef.current?.zoom(0.7)}
          aria-label={tr.zoomIn}
          className="inline-flex size-10 items-center justify-center rounded-full border border-white bg-white text-lg font-bold text-zinc-700 shadow-sm transition-colors hover:text-[#4EA6F5]"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => apiRef.current?.zoom(1.4)}
          aria-label={tr.zoomOut}
          className="inline-flex size-10 items-center justify-center rounded-full border border-white bg-white text-lg font-bold text-zinc-700 shadow-sm transition-colors hover:text-[#4EA6F5]"
        >
          −
        </button>
        <button
          type="button"
          onClick={() => apiRef.current?.reset()}
          aria-label={tr.reset}
          className="inline-flex size-10 items-center justify-center rounded-full border border-white bg-white text-zinc-700 shadow-sm transition-colors hover:text-[#4EA6F5]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {hovered && hovered.id !== selectedId && (
        <p className="pointer-events-none absolute bottom-4 left-4 rounded-2xl border border-white bg-white/95 px-3.5 py-2 text-sm shadow-sm">
          <span className="font-semibold text-zinc-900">{hovered.name}</span>
          <span className="ml-2 text-zinc-500">
            {hovered.cityLabel} · {hovered.members} {tr.members}
          </span>
        </p>
      )}
    </div>
  );
}
