import { showErrorToast } from "../toastMessage";

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

export const uploadImageToCloudinary = async (
  file: File
): Promise<CloudinaryUploadResult | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const result: CloudinaryUploadResult = await response.json();
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    showErrorToast("Failed to upload image. Please try again.");
    return null;
  }
};

export const validateImageFile = (file: File): boolean => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    showErrorToast(
      "Please select a valid image file (JPEG, PNG, WebP, or GIF)."
    );
    return false;
  }

  if (file.size > maxSize) {
    showErrorToast("Image size must be less than 5MB.");
    return false;
  }

  return true;
};
