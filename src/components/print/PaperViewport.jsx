import { useEffect, useMemo, useRef, useState } from "react";

export default function PaperViewport({
  children,
  className = "",
  mobileZoom = 0.92, // ✅ slightly smaller on phones
}) {
  const boxRef = useRef(null);
  const [boxWidth, setBoxWidth] = useState(0);

  // Approx A4 width in px on screen for scaling purpose
  const A4_WIDTH_PX = 794;

  useEffect(() => {
    if (!boxRef.current) return;

    const el = boxRef.current;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 0;
      setBoxWidth(w);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = useMemo(() => {
    const usable = Math.max(0, boxWidth - 32);
    if (!usable) return 1;

    const fitted = usable / A4_WIDTH_PX;
    const isMobile = boxWidth < 520;

    // ✅ Fit to width + extra shrink on mobile so it feels right
    const s = Math.min(1, fitted) * (isMobile ? mobileZoom : 1);
    return Math.max(0.2, Math.min(1, s));
  }, [boxWidth, mobileZoom]);

  return (
    <div ref={boxRef} className={`w-full overflow-x-hidden ${className}`}>
      <div className="flex justify-center">
        <div style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
