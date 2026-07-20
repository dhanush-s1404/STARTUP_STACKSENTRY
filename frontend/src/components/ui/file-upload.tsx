"use client";

import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/cn";
import { Upload, X, File, FileText, Image as ImageIcon } from "lucide-react";

type FileUploadProps = {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onFilesChange?: (files: File[]) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
};

function getFileIcon(file: File) {
  if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />;
  if (file.type.includes("pdf")) return <FileText className="h-4 w-4" />;
  return <File className="h-4 w-4" />;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024,
  onFilesChange,
  label,
  error,
  disabled,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);
      const valid = fileArray.filter((f) => f.size <= maxSize);
      const updated = multiple ? [...files, ...valid] : valid;
      setFiles(updated);
      onFilesChange?.(updated);
    },
    [files, multiple, maxSize, onFilesChange],
  );

  const removeFile = useCallback(
    (index: number) => {
      const updated = files.filter((_, i) => i !== index);
      setFiles(updated);
      onFilesChange?.(updated);
    },
    [files, onFilesChange],
  );

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-[hsl(var(--color-text-secondary))]">
          {label}
        </label>
      )}

      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (!disabled) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200",
          isDragging
            ? "border-blue-500 bg-blue-500/5"
            : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]",
          disabled && "cursor-not-allowed opacity-50",
          error && "border-red-500/50",
        )}
      >
        <Upload
          className={cn(
            "mb-3 h-8 w-8",
            isDragging ? "text-blue-400" : "text-[hsl(var(--color-text-muted))]",
          )}
        />
        <p className="mb-1 text-sm font-medium text-[hsl(var(--color-text-secondary))]">
          Drop files here or click to upload
        </p>
        <p className="text-xs text-[hsl(var(--color-text-muted))]">
          {accept ? `Accepted: ${accept}` : "All file types accepted"} · Max {formatSize(maxSize)}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = "";
        }}
        className="sr-only"
      />

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
            >
              <div className="text-[hsl(var(--color-text-muted))]">{getFileIcon(file)}</div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm text-white">{file.name}</p>
                <p className="text-xs text-[hsl(var(--color-text-muted))]">{formatSize(file.size)}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="rounded-md p-1 text-[hsl(var(--color-text-muted))] transition-colors hover:bg-white/5 hover:text-white"
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
