export default function ModernTemplate({ resume }) {
  const p = resume.personal;
const photo = p.photoData; 
  return (
    <div className="p-8 text-slate-900">
      {/* Header */}
      <div className="flex items-start gap-4 border-b border-slate-200 pb-4">
        {photo ? (
  <img
    src={photo}
    alt="Profile"
    className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200"
  />
) : null}
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-tight">{p.fullName || "Your Name"}</h1>
          <p className="mt-1 text-sm text-slate-600">{p.role}</p>

          <p className="mt-2 text-sm text-slate-600">
            {[p.email, p.phone, p.location, p.website].filter(Boolean).join(" • ")}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {resume.summary ? (
          <Section title="Summary">
            <p className="text-sm text-slate-700">{resume.summary}</p>
          </Section>
        ) : null}

        <Section title="Experience">
          {resume.experience?.length ? (
            <div className="space-y-4">
              {resume.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {exp.position} — {exp.company}
                      {exp.location ? ` (${exp.location})` : ""}
                    </p>
                    <p className="text-xs text-slate-500">
                      {[exp.start, exp.end].filter(Boolean).join(" – ")}
                    </p>
                  </div>

                  {exp.bullets?.length ? (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                      {exp.bullets.filter(Boolean).map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Add your experience.</p>
          )}
        </Section>

        <Section title="Education">
          {resume.education?.length ? (
            <div className="space-y-2">
              {resume.education.map((edu, i) => (
                <div key={i} className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">
                    {edu.degree} — {edu.school}
                  </p>
                  <p className="text-xs text-slate-500">
                    {[edu.start, edu.end].filter(Boolean).join(" – ")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Add your education.</p>
          )}
        </Section>

        <Section title="Skills">
          <p className="text-sm text-slate-700">
            {(resume.skills || []).join(", ")}
          </p>
        </Section>

        {resume.certifications?.length ? (
          <Section title="Certifications">
            <div className="space-y-1 text-sm text-slate-700">
              {resume.certifications.map((c, i) => (
                <p key={i}>
                  <span className="font-medium">{c.name}</span>
                  {c.issuer ? ` — ${c.issuer}` : ""}
                  {c.date ? ` (${c.date})` : ""}
                  {c.link ? ` • ${c.link}` : ""}
                </p>
              ))}
            </div>
          </Section>
        ) : null}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-xs font-bold tracking-widest text-slate-700">
        {title.toUpperCase()}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
