import  { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  onFileSelected: (f: File) => void;
  accepted?: string;
};

export default function FileUploader({ onFileSelected, accepted = ".pdf,image/*" }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length) onFileSelected(acceptedFiles[0]);
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full max-w-xl mx-auto p-8 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
        ${
          isDragActive
            ? "border-blue-500 bg-gradient-to-r from-black via-gray-900 to-black shadow-lg scale-[1.02]"
            : "border-gray-700 bg-black hover:border-blue-500 hover:bg-gray-950"
        }
      `}
      aria-label="Drop files here or click to upload"
      role="button"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        
        <div
          className={`w-16 h-16 flex items-center justify-center rounded-full border-2 transition-all duration-300
            ${isDragActive ? "border-blue-500 bg-gray-900" : "border-gray-700 bg-gray-950"}
          `}
        >
          <svg
            className={`w-8 h-8 ${isDragActive ? "text-blue-500" : "text-gray-400"}`}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M12 3v12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 7l4-4 4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="3"
              y="13"
              width="18"
              height="8"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        
        <p className="text-gray-300 font-medium text-lg text-center">
          {isDragActive ? (
            <span className="text-blue-400">Drop your file here!</span>
          ) : (
            <>
              Drag & drop a PDF or image here
              {/* <span
                className="text-white bg-blue-600 px-2 py-1 rounded cursor-pointer transition-colors hover:bg-blue-700 hover:text-white"
              >
                click to browse
              </span> */}
            </>
          )}
        </p>

        
        <p className="text-sm text-gray-500"> PDF, PNG, JPG · Max 1 file</p>
      </div>
    </div>
  );
}
