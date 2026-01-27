// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const templates = [
  {
    name: "Classic",
    desc: "Traditional layout for formal roles.",
    badge: "Most used",
    tint: "bg-blue-50 text-blue-700 ring-blue-200",
  },
  {
    name: "Modern",
    desc: "Balanced spacing with bold section headers.",
    badge: "Best for tech",
    tint: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  },
  {
    name: "Minimal",
    desc: "Clean, ATS-friendly, and easy to scan.",
    badge: "ATS-ready",
    tint: "bg-slate-50 text-slate-700 ring-slate-200",
  },
];

const features = [
  { title: "Live Preview", desc: "Instant updates while you type—no refresh needed.", icon: "⚡" },
  { title: "Template Switching", desc: "Change styles anytime without losing content.", icon: "🧩" },
  { title: "PDF Export", desc: "Print-ready PDF that matches your preview.", icon: "📄" },
  { title: "Mobile Builder", desc: "Edit on phone comfortably with a smooth layout.", icon: "📱" },
];

const steps = [
  { n: "01", title: "Fill details", desc: "Personal info, education, experience, skills, projects." },
  { n: "02", title: "Pick a template", desc: "Classic, Modern, or Minimal—swap anytime." },
  { n: "03", title: "Export PDF", desc: "Download and send applications right away." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
  <img
    src="/logo.png"
    alt="ResuMate logo"
    className="h-5 w-5 object-contain"
  />
</div>

            <span className="text-base font-semibold tracking-tight">ResuMate</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/builder" className="hidden sm:block">
              <Button variant="outline" className="border-slate-200">
                Open Builder
              </Button>
            </Link>

            <Link to="/builder">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:opacity-95">
                Build Resume
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* subtle background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute -bottom-36 right-6 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Live preview • Templates • PDF export
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Create a{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                clean, job-ready
              </span>{" "}
              resume—fast.
            </h1>

            <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
              ResuMate is a template-based resume builder with real-time preview and
              one-click PDF export—made for students, fresh grads, and busy job seekers.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/builder" className="w-full sm:w-auto">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:opacity-95 sm:w-auto">
                  Start Building
                </Button>
              </Link>

              <a href="#templates" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full border-slate-200 bg-white/70 sm:w-auto"
                >
                  View Templates
                </Button>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1">ATS-friendly layouts</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Mobile-first builder</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Print-ready PDF</span>
            </div>
          </div>
{/* Preview / resume card (real-looking, ATS-friendly) */}
<div className="relative max-w-sm">
  <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
    {/* top strip */}
    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-blue-600" />
        <p className="text-sm font-semibold text-slate-800">Resume Preview</p>
      </div>

      <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs text-blue-800 ring-1 ring-blue-200">
        ATS-friendly
      </span>
    </div>

    {/* resume body */}
    <div className="p-4">
      <div className="rounded-xl bg-white ring-1 ring-slate-200">
        {/* header */}
        <div className="flex items-start gap-3 border-b border-slate-200 p-4">
          {/* small photo */}
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg ring-1 ring-slate-200">
            <img
              src="https://placehold.co/80x80/png"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-slate-900">
              Juan Dela Cruz
            </p>
            <p className="text-xs text-slate-600">
              Frontend Developer • React • Tailwind
            </p>

            {/* ATS-style single line contacts */}
            <p className="mt-1 text-[11px] text-slate-500">
              juan@email.com • +63 900 000 0000 • Manila, PH • github.com/juan
            </p>
          </div>
        </div>

        {/* content */}
        <div className="space-y-3 p-4">
          {/* Summary */}
          <section>
            <p className="text-[10px] font-semibold tracking-wide text-slate-700">
              SUMMARY
            </p>
            <p className="mt-1 text-[11px] leading-snug text-slate-600">
              Detail-oriented frontend developer focused on clean UI, responsive
              design, and accessible web experiences. Builds maintainable React
              apps with Tailwind and modern best practices.
            </p>
          </section>

          {/* Experience */}
          <section>
            <p className="text-[10px] font-semibold tracking-wide text-slate-700">
              EXPERIENCE
            </p>

            <div className="mt-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[11px] font-semibold text-slate-900">
                  Frontend Developer — CleanPro
                </p>
                <p className="text-[10px] text-slate-500">2024 – 2025</p>
              </div>

              <ul className="mt-1.5 space-y-1 text-[11px] text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Developed responsive pages and reusable components.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Improved UX on mobile and optimized layout performance.
                </li>
              </ul>
            </div>
          </section>

          {/* Education */}
          <section>
            <p className="text-[10px] font-semibold tracking-wide text-slate-700">
              EDUCATION
            </p>

            <div className="mt-1 flex items-baseline justify-between gap-3">
              <p className="text-[11px] font-semibold text-slate-900">
                BS Information Technology — ASCOT
              </p>
              <p className="text-[10px] text-slate-500">2021 – 2025</p>
            </div>

            <p className="mt-1 text-[11px] text-slate-600">
              Capstone: eHR System (HRMS + Employee Service Portal)
            </p>
          </section>

          {/* Skills */}
          <section>
            <p className="text-[10px] font-semibold tracking-wide text-slate-700">
              SKILLS
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {["React", "Tailwind", "Supabase", "Git", "UI/UX"].map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-slate-50 px-2 py-0.5 text-[10px] text-slate-700 ring-1 ring-slate-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Looks like the final PDF output.
      </p>
    </div>
  </div>

</div>

        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Templates that feel professional
            </h2>
            <p className="max-w-2xl text-slate-600">
              Keep your content consistent and switch designs anytime.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <div
                key={t.name}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{t.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{t.desc}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs ring-1 ${t.tint}`}>
                    {t.badge}
                  </span>
                </div>

                {/* mini preview */}
                <div className="mt-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="h-2.5 w-20 rounded bg-slate-300" />
                    <div className="h-2.5 w-12 rounded bg-slate-200" />
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="h-2 w-full rounded bg-slate-200" />
                    <div className="h-2 w-11/12 rounded bg-slate-200" />
                    <div className="h-2 w-9/12 rounded bg-slate-200" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="h-8 rounded bg-slate-200" />
                    <div className="h-8 rounded bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link to="/builder">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:opacity-95">
                Try Templates Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Built for speed and clarity
            </h2>
            <p className="max-w-2xl text-slate-600">
              A clean builder experience with output you can trust.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="text-2xl">{f.icon}</div>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Three steps to a finished resume
            </h2>
            <p className="max-w-2xl text-slate-600">
              Focus on content—ResuMate handles the structure.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Step {s.n}</span>
                  <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs text-blue-800 ring-1 ring-blue-200">
                    ResuMate
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Ready to build yours?
                </h2>
                <p className="mt-2 text-white/90">
                  Start with a template, edit with live preview, export as PDF.
                </p>
              </div>

              <Link to="/builder" className="w-full sm:w-auto">
                <Button className="w-full bg-white text-slate-900 hover:bg-white/90 sm:w-auto">
                  Open Builder
                </Button>
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} ResuMate • Built with React + Tailwind
          </p>
        </div>
      </section>
    </div>
  );
}
