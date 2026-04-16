"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Save, X } from "lucide-react";

interface EditServiceFormProps {
  serviceId: string;
}

import { getServiceById, updateService } from "@/services/service";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import RichTextEditor from "@/components/shared/RichTextEditor";
import HtmlConverter from "@/utils/htmlConverter";
import { ImageUpload } from "@/components/shared/common/ImageUpload";
import { uploadImageToCloudinary } from "@/utils/cloudinary/cloudinaryUpload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function EditServiceForm({ serviceId }: EditServiceFormProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      shortDescription: "",
      description: "",
      image: "",
    },
  });

  const { watch } = form;

  useEffect(() => {
    const fetchService = async () => {
      const res = await getServiceById(serviceId);
      if (res?.data) {
        form.reset({
          title: res.data.title || "",
          shortDescription: res.data.shortDescription || "",
          description: res.data.description || "",
          image: res.data.image || "",
        });
      }
    };
    fetchService();
  }, [serviceId, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsUploading(true);

      let imageUrl = data.image;

      if (selectedFile) {
        showSuccessToast("Uploading image...");
        const uploadResult = await uploadImageToCloudinary(selectedFile);

        if (!uploadResult) {
          showErrorToast("Failed to upload image. Please try again.");
          setIsUploading(false);
          return;
        }

        imageUrl = uploadResult.secure_url;
        showSuccessToast("Image uploaded successfully!");
      }

      const payload = {
        title: data.title,
        shortDescription: data.shortDescription,
        description: data.description,
        image: imageUrl,
      };

      const res = await updateService(serviceId, payload);
      
      if (res.statusCode === 200 || res.success) {
        showSuccessToast(res.message || "Service updated successfully!");
        form.reset({
          title: data.title,
          shortDescription: data.shortDescription,
          description: data.description,
          image: imageUrl,
        });
        setSelectedFile(null);
        router.push("/dashboard/services");
      } else {
        showErrorToast(res.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      showErrorToast("Failed to update service. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-[#f8f9fa] rounded-2xl p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="write here..."
                    className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shortDescription"
            rules={{ required: "Short Description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Short Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="write here..."
                    className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Preview Description
            </label>
            <span className="">
              <HtmlConverter html={watch("description") || ""} />
            </span>
          </div>

          <FormField
            control={form.control}
            name="description"
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#0f3d3e] transition-colors bg-white">
                    <RichTextEditor value={field.value} onChange={field.onChange} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
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

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#0f3d3e] text-white px-6 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer"
              disabled={isUploading}
            >
              <Save className="w-4 h-4" />
              <span>Update</span>
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 bg-red-500 text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
              disabled={isUploading}
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
