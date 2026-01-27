import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import ResumePdfDocument from "@/pdf/ResumePdfDocument";
import { useResumeStore } from "@/store/resumeStore";

export default function ExportButton({ className = "" }) {
  const resume = useResumeStore((s) => s.resume);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      // ✅ generate pdf blob
      const blob = await pdf(<ResumePdfDocument resume={resume} />).toBlob();

      // ✅ download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ResuMate-Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      // revoke a bit later to avoid "nothing happens" on some browsers
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("PDF export failed. Check the console for the error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className={`bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-95 ${className}`}
    >
      {loading ? "Generating..." : "Download PDF"}
    </Button>
  );
}
