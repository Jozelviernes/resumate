import { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useResumeStore } from "@/store/resumeStore";
import ResumeForm from "@/components/builder/ResumeForm";
import TemplatePicker from "@/components/builder/TemplatePicker";
import PreviewPane from "@/components/builder/PreviewPane";
import ExportButton from "@/components/builder/ExportButton";
import PaperViewport from "@/components/print/PaperViewport";

export default function Builder() {
  const printRef = useRef(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const loadLocal = useResumeStore((s) => s.loadLocal);
  const resume = useResumeStore((s) => s.resume);

  useEffect(() => {
    loadLocal();
    setHydrated(true);
  }, [loadLocal]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 text-slate-600">
          Loading builder…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* (kept) */}
      <div className="sr-only">
        <div ref={printRef}>
          <PreviewPane />
        </div>
      </div>

      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-slate-900">
              ResuMate Builder
            </h1>
            <p className="hidden text-sm text-slate-500 sm:block">
              Edit on the left → live preview on the right → export PDF
            </p>
          </div>

          <div className="flex items-center gap-2">
            <TemplatePicker />

            <div className="hidden lg:block">
              <ExportButton resume={resume} />
            </div>

            {/* Mobile preview (fixed fit, no scroll) */}
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger asChild>
                <Button className="lg:hidden" variant="outline">
                  Preview
                </Button>
              </DialogTrigger>

              <DialogContent className="h-[95vh] max-w-[95vw] p-0 sm:max-w-4xl overflow-hidden">
                <DialogHeader className="border-b border-slate-200 px-4 py-3">
                  <DialogTitle>Preview</DialogTitle>
                </DialogHeader>

                {/* ✅ IMPORTANT: make dialog body overflow-hidden */}
                <div className="flex h-full flex-col overflow-hidden">
                  {/* ✅ NO SCROLL PREVIEW AREA */}
                  <div className="flex-1 overflow-hidden bg-slate-100">
                    <MobileA4Fit>
                      <PreviewPane />
                    </MobileA4Fit>
                  </div>

                  <div className="border-t border-slate-200 bg-white px-3 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setPreviewOpen(false)}
                      >
                        Close
                      </Button>
                      <ExportButton className="w-full" resume={resume} />
                    </div>

                    <p className="mt-2 text-center text-[11px] text-slate-500">
                      Mobile preview shows Page 1 only • Export includes all pages
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* ✅ Fixed-height main area */}
      <div className="mx-auto max-w-6xl px-4 py-5">
        <div className="grid gap-4 lg:grid-cols-2">
          {/* LEFT: Form */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
              <p className="text-sm font-semibold text-slate-700">Resume Info</p>
              <p className="text-xs text-slate-500">Step-by-step form</p>
            </div>

            <div className="h-[calc(100vh-160px)] overflow-y-auto p-4">
              <ResumeForm initialResume={resume} />
            </div>
          </div>

          {/* RIGHT: Live Preview */}
          <div className="hidden lg:block rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Live Preview
                </p>
                <p className="text-xs text-slate-500">Matches export (A4)</p>
              </div>
              <ExportButton resume={resume} />
            </div>

            <div className="h-[calc(100vh-160px)] overflow-y-auto overflow-x-hidden bg-slate-50 p-3">
              <PaperViewport>
                <PreviewPane />
              </PaperViewport>
            </div>
          </div>

          {/* Mobile export fallback */}
          <div className="lg:hidden">
            <ExportButton resume={resume} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ✅ Mobile A4 fit (NO SCROLL)
 * - uses A4 size in PX (stable)
 * - fits BOTH width & height of the container
 * - clips to page 1 only
 */
function MobileA4Fit({ children }) {
  const hostRef = useRef(null);
  const [rect, setRect] = useState({ w: 0, h: 0 });

  // A4 “screen” box (px). Matches common preview sizing used in many resume builders.
  const A4_W = 794;
  const A4_H = 1123;

  useLayoutEffect(() => {
    if (!hostRef.current) return;

    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (!r) return;
      setRect({ w: r.width, h: r.height });
    });

    ro.observe(hostRef.current);
    return () => ro.disconnect();
  }, []);

  const scale = useMemo(() => {
    const pad = 16;
    const usableW = Math.max(0, rect.w - pad * 2);
    const usableH = Math.max(0, rect.h - pad * 2);

    if (!usableW || !usableH) return 0.5;

    const s = Math.min(usableW / A4_W, usableH / A4_H, 1);
    return Math.max(0.2, s);
  }, [rect.w, rect.h]);

  return (
    <div
      ref={hostRef}
      className="h-full w-full overflow-hidden flex items-center justify-center p-3"
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
        <div
          className="bg-white shadow-sm"
          style={{
            width: A4_W,
            height: A4_H,
            overflow: "hidden", // ✅ clip to page 1
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
