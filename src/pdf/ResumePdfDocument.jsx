import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 36,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#0f172a",
    lineHeight: 1.35,
  },

  headerRow: {
    flexDirection: "row",
    gap: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    borderBottomStyle: "solid",
    marginBottom: 12,
  },
  photo: {
    width: 52,
    height: 52,
    borderRadius: 10,
    objectFit: "cover",
  },
  name: { fontSize: 18, fontWeight: 700 },
  role: { marginTop: 2, fontSize: 11, color: "#475569" },
  contact: { marginTop: 6, fontSize: 10, color: "#475569" },

  section: { marginTop: 10 },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#334155",
    marginBottom: 6,
  },

  p: { fontSize: 11, color: "#0f172a" },

  item: { marginBottom: 8 },
  itemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  itemTitle: { fontSize: 11, fontWeight: 700 },
  itemMeta: { fontSize: 10, color: "#64748b" },

  bullets: { marginTop: 4, paddingLeft: 12 },
  bulletRow: { flexDirection: "row", gap: 6, marginBottom: 2 },
  bulletDot: { width: 10, textAlign: "center", color: "#0f172a" },
  bulletText: { flex: 1, fontSize: 11 },

  skillsWrap: { flexDirection: "row", flexWrap: "wrap" },
  skill: {
    fontSize: 10,
    color: "#0f172a",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderStyle: "solid",
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 6,
  },

  small: { fontSize: 10, color: "#475569" },
  link: { color: "#2563eb", textDecoration: "none" },
});

function joinDot(items) {
  return (items || []).filter(Boolean).join(" • ");
}

export default function ResumePdfDocument({ resume }) {
  const p = resume?.personal || {};
  const skills = Array.isArray(resume?.skills) ? resume.skills : [];

  return (
    <Document title="ResuMate-Resume" author={p.fullName || "ResuMate"}>
      {/* Multi-page is automatic: content flows to next pages */}
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.headerRow}>
         {p.photoData ? <Image style={styles.photo} src={p.photoData} /> : null}


          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{p.fullName || "Your Name"}</Text>
            {p.role ? <Text style={styles.role}>{p.role}</Text> : null}

            <Text style={styles.contact}>
              {joinDot([p.email, p.phone, p.location])}
            </Text>

            {p.website ? (
              <Text style={styles.contact}>
                <Link src={normalizeLink(p.website)} style={styles.link}>
                  {p.website}
                </Link>
              </Text>
            ) : null}
          </View>
        </View>

        {/* Summary */}
        {resume?.summary ? (
          <Section title="SUMMARY">
            <Text style={styles.p}>{resume.summary}</Text>
          </Section>
        ) : null}

        {/* Skills */}
        {skills.length ? (
          <Section title="SKILLS">
            <View style={styles.skillsWrap}>
              {skills.map((s, i) => (
                <Text key={`${s}-${i}`} style={styles.skill}>
                  {s}
                </Text>
              ))}
            </View>
          </Section>
        ) : null}

        {/* Experience */}
        <Section title="EXPERIENCE">
          {resume?.experience?.length ? (
            resume.experience.map((e, i) => (
              <View key={i} style={styles.item} wrap={false}>
                <View style={styles.itemTop}>
                  <Text style={styles.itemTitle}>
                    {joinRoleCompany(e?.position, e?.company, e?.location)}
                  </Text>
                  <Text style={styles.itemMeta}>
                    {joinDash([e?.start, e?.end])}
                  </Text>
                </View>

                {Array.isArray(e?.bullets) && e.bullets.filter(Boolean).length ? (
                  <View style={styles.bullets}>
                    {e.bullets
                      .filter(Boolean)
                      .slice(0, 12) // keep ATS clean; you can increase
                      .map((b, bi) => (
                        <View key={bi} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{b}</Text>
                        </View>
                      ))}
                  </View>
                ) : (
                  <Text style={styles.small}> </Text>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.small}>Add your experience.</Text>
          )}
        </Section>

        {/* Education */}
        <Section title="EDUCATION">
          {resume?.education?.length ? (
            resume.education.map((e, i) => (
              <View key={i} style={styles.item} wrap={false}>
                <View style={styles.itemTop}>
                  <Text style={styles.itemTitle}>
                    {joinEdu(e?.degree, e?.school)}
                  </Text>
                  <Text style={styles.itemMeta}>
                    {joinDash([e?.start, e?.end])}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.small}>Add your education.</Text>
          )}
        </Section>

        {/* Certifications */}
        {resume?.certifications?.length ? (
          <Section title="CERTIFICATIONS">
            {resume.certifications.map((c, i) => (
              <View key={i} style={styles.item} wrap={false}>
                <Text style={styles.itemTitle}>
                  {c?.name || "Certification"}
                </Text>
                <Text style={styles.itemMeta}>
                  {joinDot([c?.issuer, c?.date])}
                </Text>
                {c?.link ? (
                  <Text style={styles.small}>
                    <Link src={normalizeLink(c.link)} style={styles.link}>
                      {c.link}
                    </Link>
                  </Text>
                ) : null}
              </View>
            ))}
          </Section>
        ) : null}
      </Page>
    </Document>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function joinDash(arr) {
  return (arr || []).filter(Boolean).join(" – ");
}

function joinRoleCompany(position, company, location) {
  const left = [position, company].filter(Boolean).join(" — ");
  return location ? `${left} (${location})` : left;
}

function joinEdu(degree, school) {
  const left = [degree, school].filter(Boolean).join(" — ");
  return left || "Education";
}

function normalizeLink(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}
