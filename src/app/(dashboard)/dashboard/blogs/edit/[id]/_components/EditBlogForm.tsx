"use client";

import { Save, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import { getBlogsById, updateBlogs } from "@/services/blog";
import { sanitizeHtml } from '@/utils/sanitizeHtml';
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

const RichTextEditor = dynamic(() => import("@/components/shared/RichTextEditor"), { ssr: false });

interface EditBlogFormProps {
  blogId: string;
}

export default function EditBlogForm({ blogId }: EditBlogFormProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    defaultValues: {
      author: "",
      title: "",
      shortDescription: "",
      description: "",
      image: "",
      status: true,
    },
  });

  const { watch } = form;

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await getBlogsById(blogId);
      if (res?.data) {
        form.reset({
          author: res.data.author || "",
          title: res.data.title || "",
          shortDescription: res.data.shortDescription || "",
          description: res.data.description || "",
          image: res.data.image || "",
          status: res.data.status ?? true,
        });
      }
    };
    fetchBlog();
  }, [blogId, form]);

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
        author: data.author,
        title: data.title,
        shortDescription: data.shortDescription,
        description: data.description,
        status: String(data.status),
        image: imageUrl,
      };

      const res = await updateBlogs(blogId, payload);
      
      if (res.statusCode === 200 || res.success) {
        showSuccessToast(res.message || "Blog updated successfully!");
        form.reset({
          author: data.author,
          title: data.title,
          shortDescription: data.shortDescription,
          description: data.description,
          image: imageUrl,
          status: data.status,
        });
        setSelectedFile(null);
        router.push("/dashboard/blogs");
      } else {
        showErrorToast(res.message || "Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      showErrorToast("Failed to update blog. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    router.push("/dashboard/blogs");
  };

  return (
    <div className="bg-[#f8f9fa] rounded-2xl p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Author Field */}
          <FormField
            control={form.control}
            name="author"
            rules={{ required: "Author is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Author <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter author name"
                    className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    placeholder="Enter blog title"
                    className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Short Description Field */}
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
                    placeholder="Enter short description"
                    className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preview Output */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Preview Description
            </label>
            <div className="prose max-w-none bg-gray-50 rounded p-2 mt-2">
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(watch("description") || "") }} />
            </div>
          </div>

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
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
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
              <span className="font-medium">Update</span>
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