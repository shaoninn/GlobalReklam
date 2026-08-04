"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, CameraOff, SwitchCamera } from "lucide-react";

interface NeonCameraARProps {
  text: string;
  color: string;
  fontFamily?: string;
}

/**
 * Real camera AR preview: live getUserMedia feed + neon overlay.
 * No WebXR / heavy 3D libs — Hostinger-safe, works on HTTPS + mobile.
 */
export function NeonCameraAR({ text, color, fontFamily }: NeonCameraARProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [facing, setFacing] = useState<"user" | "environment">("environment");
  const [pos, setPos] = useState({ x: 50, y: 42 });
  const [scale, setScale] = useState(1);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const display = text.trim() || "NEON";
  const glow = color || "#f5c518";

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
  }, []);

  const start = useCallback(async () => {
    setError(null);
    stop();
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setError("Bu tarayıcı kamera desteklemiyor.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setActive(true);
    } catch {
      setError(
        "Kamera izni verilmedi veya kullanılamıyor. HTTPS ve izin gerekir."
      );
      setActive(false);
    }
  }, [facing, stop]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  useEffect(() => {
    if (active) void start();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- restart only on facing flip while active
  }, [facing]);

  function onPointerDown(e: React.PointerEvent) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
    };
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const parent = (e.currentTarget as HTMLElement).parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const dx = ((e.clientX - d.startX) / rect.width) * 100;
    const dy = ((e.clientY - d.startY) / rect.height) * 100;
    setPos({
      x: Math.min(90, Math.max(10, d.origX + dx)),
      y: Math.min(90, Math.max(10, d.origY + dy)),
    });
  }

  function onPointerUp(e: React.PointerEvent) {
    if (dragRef.current?.pointerId === e.pointerId) dragRef.current = null;
  }

  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        muted
        autoPlay
      />
      {!active && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0a0a0c] p-6 text-center">
          <Camera size={36} className="text-orange" />
          <p className="text-sm text-muted max-w-xs">
            Mekânınızı kameradan görün, neon yazıyı üzerine yerleştirin (AR
            önizleme).
          </p>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="button"
            onClick={() => void start()}
            className="px-4 py-2 rounded-lg bg-orange text-black text-sm font-semibold"
          >
            Kamerayı aç
          </button>
        </div>
      )}

      {active && (
        <>
          <div
            className="absolute touch-none select-none cursor-grab active:cursor-grabbing px-3 py-2"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <p
              className="text-xl sm:text-4xl font-bold tracking-wide text-center break-words max-w-[min(90vw,28rem)] px-1"
              style={{
                fontFamily: fontFamily || "inherit",
                color: glow,
                textShadow: `0 0 10px ${glow}, 0 0 28px ${glow}, 0 0 60px ${glow}aa`,
              }}
            >
              {display}
            </p>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setFacing((f) => (f === "user" ? "environment" : "user"))
                }
                className="w-9 h-9 rounded-lg bg-black/70 border border-white/20 flex items-center justify-center text-white"
                aria-label="Kamerayı çevir"
              >
                <SwitchCamera size={16} />
              </button>
              <button
                type="button"
                onClick={stop}
                className="w-9 h-9 rounded-lg bg-black/70 border border-white/20 flex items-center justify-center text-white"
                aria-label="Kamerayı kapat"
              >
                <CameraOff size={16} />
              </button>
            </div>
            <label className="flex items-center gap-2 text-[10px] text-white/80 bg-black/60 px-2 py-1 rounded">
              Boyut
              <input
                type="range"
                min={0.6}
                max={2}
                step={0.05}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-24"
              />
            </label>
          </div>
          <p className="absolute top-3 left-3 text-[10px] uppercase tracking-wider bg-black/60 text-white px-2 py-1 rounded">
            Canlı AR · sürükleyerek konumla
          </p>
        </>
      )}
    </div>
  );
}
