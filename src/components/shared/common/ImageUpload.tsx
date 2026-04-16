"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, Trash2, Upload } from "lucide-react";
import { validateImageFile } from "@/utils/cloudinary/cloudinaryUpload";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
  className?: string;
}

export const ImageUpload = ({
  value,
  onChange,
  onFileSelect,
  disabled = false,
  className = "",
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string>(value || "");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const handleFileSelect = (file: File) => {
    if (!validateImageFile(file)) {
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onChange(result);
    };
    reader.readAsDataURL(file);

    // Pass file to parent component
    onFileSelect(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`${className}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />

      <div
        className={`relative inline-flex h-20 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-gray-300 bg-white shadow-sm transition-all duration-200 sm:h-24 sm:w-32 ${
          isDragging ? "border-emerald-600 ring-2 ring-emerald-200" : ""
        } ${disabled ? "cursor-not-allowed opacity-60" : "hover:border-gray-400"}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Uploaded image preview"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/15" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              disabled={disabled}
              className="absolute inset-0 m-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow-sm transition-colors hover:bg-red-700 disabled:cursor-not-allowed"
              aria-label="Remove selected image"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 px-2 text-gray-500">
            {isDragging ? (
              <Upload className="h-4 w-4 text-emerald-600" />
            ) : (
              <ImageIcon className="h-4 w-4" />
            )}
            <span className="text-[10px] font-medium leading-none text-center sm:text-xs">
              Upload Image
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
