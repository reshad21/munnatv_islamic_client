"use client";

import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
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
import { createFivePillars } from "@/services/fivePillar";
import { useRouter } from "next/navigation";
import { Save, X } from "lucide-react";

export default function CreateFivePillarsForm() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      order: 1,
      image: "",
      status: true,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsUploading(true);

    let imageUrl = data.image;

    // Upload image to Cloudinary if a file is selected
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

    // Prepare final data
    const payload = {
      title: data.title,
      description: data.description,
      order: Number(data.order),
      status: String(data.status),
      image: imageUrl,
    };

    const res = await createFivePillars(payload);
    if (res.statusCode === 201 || res.success) {
      showSuccessToast(res.message || "Pillar created successfully!");
      form.reset();
      setSelectedFile(null);
      router.push("/dashboard/fivePillarsOfIslam");
    } else {
      showErrorToast(res.message || "Failed to create pillar");
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    router.push("/dashboard/fivePillarsOfIslam");
  };

  return (
    <div className="bg-[#f8f9fa] rounded-2xl p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
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
                    placeholder="Enter pillar title"
                    className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
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
                  <textarea
                    {...field}
                    rows={5}
                    placeholder="Enter pillar description"
                    className="w-full px-4 py-3 bg-transparent border border-gray-200 rounded-lg focus:outline-none focus:border-[#0f3d3e] transition-colors resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Order Field */}
          <FormField
            control={form.control}
            name="order"
            rules={{
              required: "Order is required",
              min: { value: 1, message: "Order must be between 1 and 5" },
              max: { value: 5, message: "Order must be between 1 and 5" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Order <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="number"
                    min={1}
                    max={5}
                    placeholder="Enter order number"
                    className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload Field */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Image <span className="text-red-500">*</span>
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
    </div>
  );
}
