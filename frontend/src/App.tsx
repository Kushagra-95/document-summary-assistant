// src/App.tsx
import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import SummaryView from "./components/SummaryView";
import { uploadAndSummarize } from "./api/api";

type SummaryLength = "short" | "medium" | "long";

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [fullText, setFullText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [length, setLength] = useState<SummaryLength>("medium");
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    setSelectedFile(f);
    setSummary("");
    setFullText("");
    setError(null);

    // create preview url
    if (f.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(f));
    } else if (f.type === "application/pdf") {
      setPreviewUrl(URL.createObjectURL(f));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return setError("Please select a file.");
    setLoading(true);
    setError(null);

    try {
      const res = await uploadAndSummarize(selectedFile, length);

      if (res.error) {
        setError(res.error);
      } else {
        setSummary(res.summary ?? "");
        setFullText(res.text ?? "");
      }
    } catch (err) {
      console.error(err);
      setError("Network error — failed to contact server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-8 px-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          📄 Document Summary Assistant
        </h1>
        <p className="mt-2 text-gray-400">
          Upload PDFs or images, then generate <strong>short</strong>,{" "}
          <strong>medium</strong>, or <strong>long</strong> summaries.
        </p>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto">
        {/* File uploader */}
        <FileUploader onFileSelected={handleFile} />

        {/* File preview */}
        {previewUrl && (
          <div className="mt-6 bg-gray-900 p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-3">📌 File Preview</h2>
            {selectedFile?.type.startsWith("image/") ? (
              <img
                src={previewUrl}
                alt="preview"
                className="max-h-96 w-auto rounded-lg border border-gray-700 mx-auto"
              />
            ) : selectedFile?.type === "application/pdf" ? (
              <embed
                src={previewUrl}
                type="application/pdf"
                className="w-full h-[500px] border border-gray-700 rounded-lg"
              />
            ) : null}
            <p className="mt-2 text-sm text-gray-400 text-center">
              {selectedFile?.name}
            </p>
          </div>
        )}

        {/* Summary controls */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Dropdown for summary length */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-300 mr-2">
              Summary length:
            </label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value as SummaryLength)}
              className="px-3 py-2 text-sm border border-gray-700 rounded-md shadow-sm bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>

          {/* File name + submit */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSubmit}
              disabled={loading || !selectedFile}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Generate Summary"}
            </button>
          </div>
        </div>

        {/* Error box */}
        {error && (
          <div className="mt-4 max-w-3xl bg-red-900/50 border border-red-700 text-red-300 p-3 rounded">
            {error}
          </div>
        )}

        {/* Show summary results */}
        {summary ? <SummaryView summary={summary} fullText={fullText} /> : null}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto mt-12 text-center text-sm text-gray-500">
        Built with ❤️ — backend at{" "}
        <code className="bg-gray-800 px-1 rounded">/api/extract-and-summarize</code>
      </footer>
    </div>
  );
}
