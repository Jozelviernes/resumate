import { useResumeStore } from "@/store/resumeStore";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const options = [
  { key: "classic", label: "Classic" },
  { key: "modern", label: "Modern" },
  { key: "minimal", label: "Minimal" },
];

export default function TemplatePicker() {
  const template = useResumeStore((s) => s.resume.template);
  const setTemplate = useResumeStore((s) => s.setTemplate);

  const current = options.find((o) => o.key === template)?.label ?? "Modern";

  return (
    <div className="flex items-center">
      {/* ✅ Mobile: dropdown */}
      <div className="sm:hidden">
        <Select value={template} onValueChange={setTemplate}>
          <SelectTrigger className="h-9 w-[150px] rounded-xl border-slate-200 bg-white">
            <SelectValue placeholder="Template">{current}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o.key} value={o.key}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ✅ Desktop: segmented buttons */}
      <div className="hidden sm:flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
        {options.map((o) => {
          const active = template === o.key;
          return (
            <button
              key={o.key}
              onClick={() => setTemplate(o.key)}
              className={[
                "px-3 py-1.5 text-xs rounded-lg transition",
                active
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50",
              ].join(" ")}
              type="button"
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
