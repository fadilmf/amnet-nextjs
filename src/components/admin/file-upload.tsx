import { ChangeEvent, useState } from "react";

interface FileUploadProps {
  label: string;
  accept?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, label: string) => void; // Callback to send the file to the parent
}

export function FileUpload({ label, accept, onChange }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Clear previous error messages
    setFileError(null);

    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setFileError("File size exceeds 10MB.");
        return;
      }

      // Validate file type (optional, can be adjusted based on your needs)
      const allowedTypes = accept?.split(",") || ["image/*", "application/pdf"];
      const isValidType = allowedTypes.some((type) =>
        file.type.includes(type.split("/")[0])
      );

      if (!isValidType) {
        setFileError(
          `Invalid file type. Please upload a valid file (${allowedTypes.join(
            ", "
          )}).`
        );
        return;
      }

      setFileName(file.name);
      onChange(event, label); // Pass the file data to the parent
    }
  };

  return (
    <div className="mb-4 border-dashed border-2 border-gray-300 rounded-lg p-4 text-center">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="file-input w-full text-center text-gray-500"
      />

      {fileName && (
        <p className="text-sm text-gray-600 mt-2">Uploaded file: {fileName}</p>
      )}

      {fileError && <p className="text-sm text-red-500 mt-2">{fileError}</p>}

      <p className="text-sm text-gray-500 mt-2">
        {accept
          ? `Allowed file types: ${accept}`
          : "JPG, PNG, or PDF. No more than 10MB."}
      </p>
    </div>
  );
}
