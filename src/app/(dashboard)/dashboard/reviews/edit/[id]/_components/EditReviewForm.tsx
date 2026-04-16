"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Save, Star, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getReviewById, updateReview } from "@/services/review";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
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

interface EditReviewFormProps {
  reviewId: string;
}

export default function EditReviewForm({ reviewId }: EditReviewFormProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const form = useForm({
    defaultValues: {
      name: "",
      designation: "",
      rating: 4,
      description: "",
      image: "",
      status: true,
    },
  });

  // Load review data on component mount
  useEffect(() => {
    const fetchReview = async () => {
      const res = await getReviewById(reviewId);
      if (res?.data) {
        form.reset({
          name: res.data.name || "",
          designation: res.data.designation || "",
          rating: res.data.rating || 4,
          description: res.data.description || "",
          image: res.data.thumbnail || res.data.image || "",
          status: res.data.status ?? true,
        });
      }
    };
    fetchReview();
  }, [reviewId, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsUploading(true);

      // Initialize image URL with existing/current value
      let imageUrl = data.image;

      // Upload new file only when user selects a new one
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
      } else {
        console.log("No new file selected, using existing image");
      }

      // Prepare final review payload
      const payload = {
        name: data.name,
        designation: data.designation,
        rating: String(data.rating),
        description: data.description,
        image: imageUrl, // Use the image URL (new or existing)
        status: String(data.status),
      };

      const res = await updateReview(reviewId, payload);

      if (res.statusCode === 200 || res.success) {
        showSuccessToast(res.message || "Review updated successfully!");
        form.reset({ 
          name: data.name,
          designation: data.designation,
          rating: data.rating,
          description: data.description,
          image: imageUrl, // Keep the updated image
          status: data.status
        });
        setSelectedFile(null);
        router.push("/dashboard/reviews");
      } else {
        showErrorToast(res.message || "Failed to update gallery image");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      showErrorToast("Failed to update review. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    router.push("/dashboard/reviews");
  };

  return (
    <div className="bg-[#f8f9fa] rounded-2xl p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Name</FormLabel>
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

          {/* Designation Field */}
          <FormField
            control={form.control}
            name="designation"
            rules={{ required: "Designation is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Designation</FormLabel>
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

          {/* Rating Field */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Add Rating</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => field.onChange(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= (hoverRating || Number(field.value))
                              ? "fill-orange-400 text-orange-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
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
                <FormLabel className="text-sm font-medium text-gray-700">Description</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="write here..."
                    className="w-full px-4 py-3 bg-transparent border border-gray-200 rounded-lg focus:outline-none focus:border-[#0f3d3e] transition-colors resize-none"
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
              <span className="font-medium">{isUploading ? "Saving..." : "Save"}</span>
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