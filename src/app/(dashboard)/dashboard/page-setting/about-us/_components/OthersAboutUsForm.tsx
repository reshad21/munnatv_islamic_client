/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Save, X, ImageIcon } from "lucide-react";
import Image from "next/image";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { useRouter } from "next/navigation";
import { uploadImageToCloudinary } from "@/utils/cloudinary/cloudinaryUpload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createOtherAboutus,
  updateOtherAboutus,
} from "@/services/OtherAboutUs";

interface OthersFormData {
  id?: string;
  title: string;
  description: string;
  experienceYears: string;
  trustedReviews: string;
  servicesProvided: string;
}

interface OthersAboutUsFormProps {
  othersData?: any;
}

const OthersAboutUsForm = ({ othersData }: OthersAboutUsFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!othersData?.id;

  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<OthersFormData>({
    defaultValues: {
      title: othersData?.title || "",
      description: othersData?.description || "",
      experienceYears: othersData?.experienceYears || "",
      trustedReviews: othersData?.trustedReviews || "",
      servicesProvided: othersData?.servicesProvided || "",
    },
  });

  useEffect(() => {
    // Determine existing backend image
    const sourceImage = othersData?.image || othersData?.imageUrl;
    
    if (typeof sourceImage === 'string' && sourceImage !== "") {
      setExistingImageUrl(sourceImage);
    } 
  }, [othersData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleRemoveExistingImage = () => {
    setExistingImageUrl(null);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: OthersFormData) => {
    if (!selectedFile && !existingImageUrl) {
      showErrorToast("Please provide an image.");
      return;
    }

    setIsUploading(true);

    try {
      let finalImageUrl: string = existingImageUrl || "";

      if (selectedFile) {
        showSuccessToast("Uploading new image...");
        const uploadResult = await uploadImageToCloudinary(selectedFile);
        if (!uploadResult) {
          showErrorToast(`Failed to upload image: ${selectedFile.name}. Please try again.`);
          setIsUploading(false);
          return;
        }
        finalImageUrl = uploadResult.secure_url;
        showSuccessToast("Image uploaded successfully!");
      }

      const payload = {
        title: data.title,
        description: data.description,
        experienceYears: data.experienceYears,
        trustedReviews: data.trustedReviews,
        servicesProvided: data.servicesProvided,
        image: finalImageUrl,
      };

      startTransition(async () => {
        let res;
        if (isEditing && othersData?.id) {
          res = await updateOtherAboutus(othersData.id, payload);
        } else {
          res = await createOtherAboutus(payload);
        }

        if (res.statusCode === (isEditing ? 200 : 201) || res.success) {
          showSuccessToast(res.message);
          
          if (!isEditing) {
            form.reset();
            setSelectedFile(null);
            setImagePreview(null);
            setExistingImageUrl(null);
          }
          
          router.refresh();
        } else {
          showErrorToast(res.message || "Something went wrong");
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      showErrorToast("An error occurred. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const hasImage = !!existingImageUrl || !!imagePreview;

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {isEditing
                ? "Edit Others About Section"
                : "Create Others About Section"}
            </h2>
          </div>

          <div className="space-y-4">
            {/* Title */}
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
                      className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
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
                      placeholder="write here..."
                      className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] min-h-[80px] transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Experience Years */}
              <FormField
                control={form.control}
                name="experienceYears"
                rules={{ required: "Experience Years is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Experience Years <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        placeholder="write here..."
                        className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Trusted Reviews */}
              <FormField
                control={form.control}
                name="trustedReviews"
                rules={{ required: "Trusted Reviews is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Trusted Reviews <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        placeholder="write here..."
                        className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Services Provided */}
              <FormField
                control={form.control}
                name="servicesProvided"
                rules={{ required: "Services Provided is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Services Provided <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        placeholder="write here..."
                        className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Single Image Upload Field */}
            <div className="space-y-4 pt-4">
              <label className="text-sm font-medium text-gray-700">
                Upload Image <span className="text-red-500">*</span>
              </label>
              <div className={`w-full border-2 border-dashed ${isUploading ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-[#0f3d3e]'} rounded-xl p-6 transition-colors relative flex justify-center items-center min-h-[160px]`}>
                {imagePreview ? (
                  <div className="relative aspect-square w-40 group">
                    <Image
                      src={imagePreview}
                      alt="New Preview"
                      fill
                      className="object-cover rounded-lg shadow-sm"
                      unoptimized
                    />
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded shadow-sm opacity-90">
                      New
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      disabled={isUploading || isPending}
                      className="absolute -top-2 -right-2 w-7 h-7 bg-white text-red-500 rounded-full flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all shadow-md z-20 border border-red-100 disabled:opacity-50"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : existingImageUrl ? (
                  <div className="relative aspect-square w-40 group">
                    <Image
                      src={existingImageUrl}
                      alt="Existing Image"
                      fill
                      className="object-cover rounded-lg shadow-sm"
                      unoptimized
                    />
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded shadow-sm opacity-90">
                      Existing
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveExistingImage();
                      }}
                      disabled={isUploading || isPending}
                      className="absolute -top-2 -right-2 w-7 h-7 bg-white text-red-500 rounded-full flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all shadow-md z-20 border border-red-100 disabled:opacity-50"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      Click to upload image
                    </h3>
                    <p className="text-xs text-gray-500">
                      Upload image (1 limit)
                    </p>
                  </div>
                )}
                
                {!imagePreview && !existingImageUrl && !isUploading && !isPending && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    style={{ zIndex: 2 }}
                  />
                )}
              </div>
              {hasImage && !isUploading && !isPending && (
                 <p className="text-xs text-gray-500 mt-1">
                   ��� You can remove the current image to upload a new one
                 </p>
              )}
              {!hasImage && (
                  <p className="text-[0.8rem] font-medium text-red-500">
                    An image is required
                  </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-8 pt-4">
            <button
              type="submit"
              disabled={isPending || isUploading}
              className="cursor-pointer flex items-center gap-2 bg-[#0f3d3e] text-white px-6 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors disabled:opacity-70"
            >
              <Save className="w-4 h-4" />
              <span className="font-medium">
                {isUploading 
                  ? "Uploading..." 
                  : isPending
                    ? (isEditing ? "Updating..." : "Creating...")
                    : (isEditing ? "Update Others About Section" : "Create Others About Section")
                }
              </span>
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OthersAboutUsForm;
