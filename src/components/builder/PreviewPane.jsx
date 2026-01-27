import { useResumeStore } from "@/store/resumeStore";
import ResumePaper from "@/components/print/ResumePaper";

import ClassicTemplate from "@/components/templates/ClassicTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";

const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
};

export default function PreviewPane() {
  const resume = useResumeStore((s) => s.resume);
  const Template = templates[resume.template] || ModernTemplate;

  return (
    <ResumePaper>
      <Template resume={resume} />
    </ResumePaper>
  );
}
