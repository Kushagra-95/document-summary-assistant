// src/api/api.ts
export type ExtractAndSummarizeResponse = {
  text?: string;
  summary?: string;
  error?: string;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

export async function uploadAndSummarize(file: File, length: "short" | "medium" | "long"): Promise<ExtractAndSummarizeResponse> {
  const form = new FormData();
  form.append("file", file);
  form.append("length", length);

  const res = await fetch(`${BASE_URL}/api/extract-and-summarize`, {
    method: "POST",
    body: form,
  });

  const json = await res.json();
  if (!res.ok) {
    return { error: json?.error || `HTTP ${res.status}` };
  }
  return json as ExtractAndSummarizeResponse;
}
