export default function MinimalTemplate({ resume }) {
  const p = resume.personal;
  const exp = resume.experience?.[0];
  const edu = resume.education?.[0];

  return (
    <div className="p-8 text-slate-900">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold">{p.fullName}</h1>
        <p className="mt-1 text-sm text-slate-600">{p.role}</p>
        <p className="mt-2 text-sm text-slate-600">
          {p.email} • {p.phone} • {p.location} {p.website ? `• ${p.website}` : ""}
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <Mini title="Summary">{resume.summary}</Mini>

        <Mini title="Experience">
          {exp ? (
            <>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-semibold">{exp.position} — {exp.company}</p>
                <p className="text-xs text-slate-500">{exp.start}–{exp.end}</p>
              </div>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                {(exp.bullets || []).slice(0, 3).map((b, i) => (
                  <p key={i}>- {b}</p>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-500">Add your first experience.</p>
          )}
        </Mini>

        <Mini title="Education">
          {edu ? (
            <p className="text-sm text-slate-700">
              {edu.degree} — {edu.school} ({edu.start}–{edu.end})
            </p>
          ) : (
            <p className="text-sm text-slate-500">Add your education.</p>
          )}
        </Mini>

        <Mini title="Skills">{(resume.skills || []).join(", ")}</Mini>
      </div>
    </div>
  );
}

function Mini({ title, children }) {
  return (
    <section>
      <p className="text-xs font-semibold tracking-wide text-slate-700">
        {title.toUpperCase()}
      </p>
      <div className="mt-2">{children}</div>
    </section>
  );
}
