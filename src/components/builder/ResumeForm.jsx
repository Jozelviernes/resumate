import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/resumeStore";

const emptyExperience = () => ({
  company: "",
  position: "",
  location: "",
  start: "",
  end: "",
  bullets: [""],
});

const emptyEducation = () => ({
  school: "",
  degree: "",
  start: "",
  end: "",
});

const emptyCert = () => ({
  name: "",
  issuer: "",
  date: "",
  link: "",
});

const STEPS = [
  { key: "personal", label: "Personal" },
  { key: "summary", label: "Summary" },
  { key: "skills", label: "Skills" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
  { key: "certifications", label: "Certifications" },
  { key: "review", label: "Review" },
];

export default function ResumeForm({ initialResume }) {
  const setResume = useResumeStore((s) => s.setResume);
  const saveLocal = useResumeStore((s) => s.saveLocal);

  const defaults = useMemo(
    () =>
      initialResume ?? {
        template: "modern",
        personal: {
          fullName: "",
          role: "",
          email: "",
          phone: "",
          location: "",
          website: "",
          photoUrl: "",
        },
        summary: "",
        skills: [],
        experience: [],
        education: [],
        certifications: [],
      },
    [initialResume]
  );

  const form = useForm({
    defaultValues: defaults,
    mode: "onChange",
  });

  const { control, register, watch, setValue, getValues } = form;

  const exp = useFieldArray({ control, name: "experience" });
  const edu = useFieldArray({ control, name: "education" });
  const cert = useFieldArray({ control, name: "certifications" });

  // ✅ Live sync to preview + localStorage
  useEffect(() => {
    const sub = watch((values) => {
      setResume(values);
      saveLocal();
    });
    return () => sub.unsubscribe();
  }, [watch, setResume, saveLocal]);

  // Wizard step
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  function next() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-5">
      {/* Step header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            {current.label}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>

        {/* Mini step pills (clickable) */}
        <div className="hidden sm:flex flex-wrap justify-end gap-1">
          {STEPS.map((s, i) => {
            const active = i === step;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setStep(i)}
                className={[
                  "rounded-full px-3 py-1 text-xs ring-1 transition",
                  active
                    ? "bg-blue-600 text-white ring-blue-600"
                    : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50",
                ].join(" ")}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        {current.key === "personal" && (
          <section className="space-y-3">
            <p className="text-sm text-slate-500">
              Basic details shown at the top of your resume.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Full Name">
                <input
                  {...register("personal.fullName")}
                  className={input()}
                  placeholder="Juan Dela Cruz"
                />
              </Field>

              <Field label="Role / Title">
                <input
                  {...register("personal.role")}
                  className={input()}
                  placeholder="Frontend Developer"
                />
              </Field>

              <Field label="Email">
                <input
                  {...register("personal.email")}
                  className={input()}
                  placeholder="you@email.com"
                />
              </Field>

              <Field label="Phone">
                <input
                  {...register("personal.phone")}
                  className={input()}
                  placeholder="+63 9xx xxx xxxx"
                />
              </Field>

              <Field label="Location">
                <input
                  {...register("personal.location")}
                  className={input()}
                  placeholder="Manila, PH"
                />
              </Field>

              <Field label="Portfolio / GitHub">
                <input
                  {...register("personal.website")}
                  className={input()}
                  placeholder="github.com/username"
                />
              </Field>
<Field label="Profile Photo (optional)" hint="PNG/JPG • max 1MB">
  <input
    type="file"
    accept="image/png,image/jpeg,image/jpg"
    className={input()}
    onChange={async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // ✅ basic size limit for localStorage safety
      const MAX_MB = 1;
      if (file.size > MAX_MB * 1024 * 1024) {
        alert(`Image too large. Please use a photo under ${MAX_MB}MB.`);
        e.target.value = "";
        return;
      }

      const dataUrl = await fileToDataUrl(file);
      setValue("personal.photoData", dataUrl, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }}
  />

  {/* small preview + remove */}
  <div className="mt-2 flex items-center gap-3">
    {watch("personal.photoData") ? (
      <>
        <img
          src={watch("personal.photoData")}
          alt="Preview"
          className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200"
        />
        <Button
          type="button"
          variant="outline"
          className="border-slate-200"
          onClick={() =>
            setValue("personal.photoData", "", {
              shouldDirty: true,
              shouldTouch: true,
            })
          }
        >
          Remove
        </Button>
      </>
    ) : (
      <p className="text-xs text-slate-500">No photo uploaded.</p>
    )}
  </div>
</Field>

            </div>
          </section>
        )}

        {current.key === "summary" && (
          <section className="space-y-3">
            <p className="text-sm text-slate-500">
              Keep it short. 2–4 lines works best for ATS.
            </p>

            <textarea
              {...register("summary")}
              rows={6}
              className={textarea()}
              placeholder="Write a short, strong summary..."
            />
          </section>
        )}

        {current.key === "skills" && (
          <section className="space-y-3">
            <p className="text-sm text-slate-500">
              Use commas. Example: React, Tailwind, Git
            </p>

            <input
              className={input()}
              placeholder="React, Tailwind, Git, Supabase"
              defaultValue={(defaults.skills || []).join(", ")}
              onChange={(e) => {
                const skills = e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean);
                setValue("skills", skills, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }}
            />

            <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 ring-1 ring-slate-200">
              Tip: Add keywords from the job post to improve ATS matching.
            </div>
          </section>
        )}

        {current.key === "experience" && (
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                Add multiple jobs/internships.
              </p>
              <Button
                type="button"
                variant="outline"
                className="border-slate-200"
                onClick={() => exp.append(emptyExperience())}
              >
                + Add
              </Button>
            </div>

            {exp.fields.length === 0 ? (
              <EmptyHint text="No experience yet. Click “Add” to create one." />
            ) : (
              <div className="space-y-4">
                {exp.fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-800">
                        Experience #{index + 1}
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-slate-200"
                        onClick={() => exp.remove(index)}
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <Field label="Company">
                        <input
                          {...register(`experience.${index}.company`)}
                          className={input()}
                        />
                      </Field>
                      <Field label="Position">
                        <input
                          {...register(`experience.${index}.position`)}
                          className={input()}
                        />
                      </Field>
                      <Field label="Location (optional)">
                        <input
                          {...register(`experience.${index}.location`)}
                          className={input()}
                        />
                      </Field>
                      <Field label="Start">
                        <input
                          {...register(`experience.${index}.start`)}
                          className={input()}
                          placeholder="2024"
                        />
                      </Field>
                      <Field label="End">
                        <input
                          {...register(`experience.${index}.end`)}
                          className={input()}
                          placeholder="2025 / Present"
                        />
                      </Field>
                    </div>

                    <Bullets
                      control={control}
                      register={register}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {current.key === "education" && (
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                Add multiple schools/degrees.
              </p>
              <Button
                type="button"
                variant="outline"
                className="border-slate-200"
                onClick={() => edu.append(emptyEducation())}
              >
                + Add
              </Button>
            </div>

            {edu.fields.length === 0 ? (
              <EmptyHint text="No education yet. Click “Add” to create one." />
            ) : (
              <div className="space-y-4">
                {edu.fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-800">
                        Education #{index + 1}
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-slate-200"
                        onClick={() => edu.remove(index)}
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <Field label="School">
                        <input
                          {...register(`education.${index}.school`)}
                          className={input()}
                        />
                      </Field>
                      <Field label="Degree">
                        <input
                          {...register(`education.${index}.degree`)}
                          className={input()}
                        />
                      </Field>
                      <Field label="Start">
                        <input
                          {...register(`education.${index}.start`)}
                          className={input()}
                          placeholder="2021"
                        />
                      </Field>
                      <Field label="End">
                        <input
                          {...register(`education.${index}.end`)}
                          className={input()}
                          placeholder="2025"
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {current.key === "certifications" && (
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                Add certificates, trainings, seminars.
              </p>
              <Button
                type="button"
                variant="outline"
                className="border-slate-200"
                onClick={() => cert.append(emptyCert())}
              >
                + Add
              </Button>
            </div>

            {cert.fields.length === 0 ? (
              <EmptyHint text="No certifications yet. Click “Add” to create one." />
            ) : (
              <div className="space-y-4">
                {cert.fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-800">
                        Certification #{index + 1}
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-slate-200"
                        onClick={() => cert.remove(index)}
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <Field label="Certificate Name">
                        <input
                          {...register(`certifications.${index}.name`)}
                          className={input()}
                        />
                      </Field>
                      <Field label="Issuer">
                        <input
                          {...register(`certifications.${index}.issuer`)}
                          className={input()}
                        />
                      </Field>
                      <Field label="Date">
                        <input
                          {...register(`certifications.${index}.date`)}
                          className={input()}
                          placeholder="2025"
                        />
                      </Field>
                      <Field label="Link (optional)">
                        <input
                          {...register(`certifications.${index}.link`)}
                          className={input()}
                          placeholder="https://..."
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {current.key === "review" && (
          <section className="space-y-3">
            <p className="text-sm text-slate-600">
              Quick review before exporting.
            </p>

            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 ring-1 ring-slate-200">
              <p className="font-semibold">{getValues("personal.fullName") || "Your Name"}</p>
              <p className="text-slate-600">{getValues("personal.role")}</p>
              <p className="mt-2 text-xs text-slate-500">
                Skills: {(getValues("skills") || []).join(", ") || "—"}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Experience: {exp.fields.length} item(s) • Education: {edu.fields.length} item(s) • Certifications: {cert.fields.length} item(s)
              </p>
            </div>

            <div className="rounded-xl bg-blue-600/10 p-3 text-xs text-blue-900 ring-1 ring-blue-200">
              Tip: If your resume becomes 2+ pages, that’s fine—export will handle it.
            </div>
          </section>
        )}
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          className="border-slate-200"
          onClick={back}
          disabled={step === 0}
        >
          Back
        </Button>

        <div className="text-xs text-slate-500">
          {current.label}
        </div>

        <Button
          type="button"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-95"
          onClick={next}
          disabled={step === STEPS.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

/* ===== helpers ===== */
function Bullets({ control, register, index }) {
  const bullets = useFieldArray({ control, name: `experience.${index}.bullets` });

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-wide text-slate-700">
          BULLETS (ATS-friendly)
        </p>
        <Button
          type="button"
          variant="outline"
          className="h-8 border-slate-200 px-3 text-xs"
          onClick={() => bullets.append("")}
        >
          + Add bullet
        </Button>
      </div>

      <div className="mt-2 space-y-2">
        {bullets.fields.map((b, bIndex) => (
          <div key={b.id} className="flex gap-2">
            <input
              {...register(`experience.${index}.bullets.${bIndex}`)}
              className={input()}
              placeholder="Built responsive UI..."
            />
            <Button
              type="button"
              variant="outline"
              className="h-10 border-slate-200"
              onClick={() => bullets.remove(bIndex)}
            >
              ✕
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Header({ title, desc }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      {desc ? <p className="mt-1 text-sm text-slate-500">{desc}</p> : null}
    </div>
  );
}

function EmptyHint({ text }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
      {text}
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <div className="flex items-end justify-between gap-3">
        <span className="text-xs font-medium text-slate-700">{label}</span>
        {hint ? <span className="text-[11px] text-slate-400">{hint}</span> : null}
      </div>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function input() {
  return "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200";
}
function textarea() {
  return "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200";
}
async function fileToDataUrl(file) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
