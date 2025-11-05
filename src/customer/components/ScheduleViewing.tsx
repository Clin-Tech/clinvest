"use client";

import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  note?: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  preferredDate: "",
  note: "",
};

const ScheduleViewing: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const validate = (data: FormState) => {
    if (!data.name.trim()) return "Name is required.";
    if (!data.phone.trim()) return "Phone is required.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const v = validate(form);
    if (v) {
      setError(v);
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 900));
      setSuccess("Request sent — the agent will contact you shortly.");
      setForm(initialState);
    } catch (err) {
      setError("Failed to send request. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold">Schedule a Viewing</h3>
      <p className="text-sm text-gray-500 mb-3">
        Tell us when you'd like to see the property and we’ll arrange the visit.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-xs font-medium text-gray-700">Full name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-700">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
            placeholder="+2348012345678"
            required
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-700">
            Preferred date & time
          </label>
          <input
            name="preferredDate"
            value={form.preferredDate}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
            placeholder="e.g. 2025-10-20 10:00"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-700">
            Note (optional)
          </label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
            placeholder="Any additional info"
            rows={3}
          />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}
        {success && <div className="text-sm text-green-600">{success}</div>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#090040] text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Request Viewing"}
        </button>
      </form>
    </div>
  );
};

export default ScheduleViewing;
