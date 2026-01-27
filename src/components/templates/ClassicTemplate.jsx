export default function ClassicTemplate({ resume }) {
  const p = resume.personal;
  const exp = resume.experience?.[0];
  const edu = resume.education?.[0];

  return (
    <div className="p-8 font-serif text-slate-900">
      <div className="text-center border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold">{p.fullName}</h1>
        <p className="mt-1 text-sm text-slate-600">{p.role}</p>
        <p className="mt-2 text-sm text-slate-600">
          {p.email} | {p.phone} | {p.location} {p.website ? `| ${p.website}` : ""}
        </p>
      </div>

      <div className="mt-5 space-y-5">
        <Block title="Summary">
          <p className="text-sm text-slate-700">{resume.summary}</p>
        </Block>

        <Block title="Experience">
          {exp ? (
            <>
              <p className="text-sm font-semibold">
                {exp.position}, {exp.company} ({exp.start} – {exp.end})
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {(exp.bullets || []).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm text-slate-500">Add your first experience.</p>
          )}
        </Block>

        <Block title="Education">
          {edu ? (
            <p className="text-sm text-slate-700">
              <span className="font-semibold">{edu.degree}</span>, {edu.school} ({edu.start} – {edu.end})
            </p>
          ) : (
            <p className="text-sm text-slate-500">Add your education.</p>
          )}
        </Block>

        <Block title="Skills">
          <p className="text-sm text-slate-700">{(resume.skills || []).join(", ")}</p>
        </Block>
      </div>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <section>
      <h2 className="text-sm font-bold">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
