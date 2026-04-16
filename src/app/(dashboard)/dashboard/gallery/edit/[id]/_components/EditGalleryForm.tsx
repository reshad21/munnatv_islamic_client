"use client";

import { getGalleryById, updateGallery } from "@/services/gallery";
import { ImageUpload } from "@/components/shared/common/ImageUpload";
import { uploadImageToCloudinary } from "@/utils/cloudinary/cloudinaryUpload";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface EditGalleryFormProps {
  galleryId: string;
}

export default function EditGalleryForm({ galleryId }: EditGalleryFormProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    defaultValues: {
      image: "",
      status: true,
    },
  });

  useEffect(() => {
    const fetchGallery = async () => {
      const res = await getGalleryById(galleryId);
      if (res?.data) {
        form.reset({
          image: res.data.thumbnail || res.data.image || "",
          status: res.data.status ?? true,
        });
      }
    };

    fetchGallery();
  }, [galleryId, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsUploading(true);

      let thumbnailUrl = data.image;

      // Upload new file only when user selects a new one.
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

      const payload = {
        thumbnail: thumbnailUrl,
        status: data.status,
      };

      const res = await updateGallery(galleryId, payload);
      if (res.statusCode === 200) {
        showSuccessToast(res.message || "Gallery image updated successfully!");
        form.reset({ image: "", status: true });
        setSelectedFile(null);
        router.push("/dashboard/gallery");
      } else {
        showErrorToast(res.message || "Failed to update gallery image");
      }
    } catch (error) {
      console.error("Error updating gallery:", error);
      showErrorToast("Failed to update gallery image. Please try again.");
    } finally {
      setIsUploading(false);
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

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#0f3d3e] text-white px-5 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer"
            disabled={isUploading}
          >
            <Save className="w-4 h-4" />
            <span className="font-medium">{isUploading ? "Saving..." : "Save"}</span>
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span className="font-medium">Close</span>
          </button>
        </div>
      </form>
    </Form>
  );
}
