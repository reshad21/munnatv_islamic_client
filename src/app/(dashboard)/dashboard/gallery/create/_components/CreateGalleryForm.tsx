"use client";

import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "@/components/shared/common/ImageUpload";
import { uploadImageToCloudinary } from "@/utils/cloudinary/cloudinaryUpload";
import { showSuccessToast, showErrorToast } from "@/utils/toastMessage";
import { createGallery } from "@/services/gallery";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Save, X } from "lucide-react";

export default function CreateGalleryForm() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    defaultValues: {
      image: "",
      status: true,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsUploading(true);

    let thumbnailUrl = data.image;

    // Upload image to Cloudinary if a file is selected
    if (selectedFile) {
      showSuccessToast("Uploading image...");
      const uploadResult = await uploadImageToCloudinary(selectedFile);

      if (!uploadResult) {
        showErrorToast("Failed to upload image. Please try again.");
        setIsUploading(false);
        return;
      }

      thumbnailUrl = uploadResult.secure_url;
      showSuccessToast("Image uploaded successfully!");
    }

    // Prepare final gallery data
    const galleryData = {
      thumbnail: thumbnailUrl,
      status: data.status,
    };

    const response = await createGallery(galleryData);

    if (response.statusCode === 201) {
      showSuccessToast(
        response.message || "Gallery image created successfully!",
      );
      form.reset();
      setSelectedFile(null);
      router.push("/dashboard/gallery");
    } else {
      showErrorToast(response.message || "Failed to create gallery image");
    }
  };

  const handleClose = () => {
    router.push("/dashboard/gallery");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-gray-700">
                Upload Image
              </FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  onFileSelect={setSelectedFile}
                  disabled={isUploading}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#0f3d3e] text-white px-5 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer"
            disabled={isUploading}
          >
            <Save className="w-4 h-4" />
            <span className="font-medium">Save</span>
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
            disabled={isUploading}
          >
            <X className="w-4 h-4" />
            <span className="font-medium">Close</span>
          </button>
        </div>
      </form>
    </Form>
  );
}
