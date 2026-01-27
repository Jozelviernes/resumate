import { create } from "zustand";

const DEFAULT_RESUME = {
  template: "modern",
  personal: {
    fullName: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    website: "",
     photoData: "",
  },
  summary: "",
  experience: [],
  education: [],
  certifications: [],
  skills: [],
};

export const useResumeStore = create((set, get) => ({
  resume: DEFAULT_RESUME,

  setTemplate: (template) =>
    set((s) => ({ resume: { ...s.resume, template } })),

  setResume: (resume) => set({ resume }),

  saveLocal: () => {
    try {
      localStorage.setItem("resumate.resume", JSON.stringify(get().resume));
    } catch {}
  },

  loadLocal: () => {
    try {
      const raw = localStorage.getItem("resumate.resume");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      set({ resume: { ...DEFAULT_RESUME, ...parsed } });
    } catch {}
  },
}));
