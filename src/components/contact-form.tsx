"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

type FormState = {
  name: string;
  email: string;
  message: string;
  type: string;
  website: string; // honeypot — must stay empty
};

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    type: "commission",
    website: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", type: "commission", website: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border border-line bg-surface text-foreground text-[15px] px-4 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-faint";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <p className="section-label text-softer mb-16">{t("title")}</p>

      {/* Honeypot: hidden from real users, bots fill it in */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        aria-label={t("honeypot")}
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 pointer-events-none w-0 h-0"
      />

      <div>
        <label htmlFor="type" className="caption-category block mb-2">
          {t("type")}
        </label>
        <select
          id="type"
          name="type"
          value={form.type}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="commission">{t("type_commission")}</option>
          <option value="job">{t("type_job")}</option>
          <option value="other">{t("type_other")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="name" className="caption-category block mb-2">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="caption-category block mb-2">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="caption-category block mb-2">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "success" && (
        <p className="text-[14px] text-accent">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-[14px] text-red-500">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="button-primary disabled:opacity-40"
      >
        {status === "sending" ? t("sending") : t("send")}
      </button>
    </form>
  );
}
