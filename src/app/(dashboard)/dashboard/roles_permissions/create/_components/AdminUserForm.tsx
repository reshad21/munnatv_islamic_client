"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ImageIcon, Save, X } from "lucide-react";
// import { useRouter } from "next/navigation";
import { register } from "@/services/auth";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { uploadImageToCloudinary } from "@/utils/cloudinary/cloudinaryUpload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AdminUserData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  status: boolean;
  roleId: string;
}

interface RoleData {
  id: string;
  name: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
}

const AdminUserForm = ({ roleData = [] }: { roleData: RoleData[] }) => {
  // const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<AdminUserData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      status: true,
      roleId: "",
    },
  });

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

  const onSubmit = async (data: AdminUserData) => {
    if (data.password !== data.confirmPassword) {
      showErrorToast("Passwords do not match");
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
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        status: data.status ? "ACTIVE" : "INACTIVE",
        roleId: data.roleId,
        profilePhoto: finalImageUrl,
      };

      startTransition(async () => {
        const res = await register(payload);
        if (res.statusCode === 201 || res.success) {
          showSuccessToast(res.message);
          form.reset();
          setSelectedFile(null);
          setImagePreview(null);
          setExistingImageUrl(null);
          // router.push("/dashboard/roles_permissions");
        } else {
          showErrorToast(res.message || "Something went wrong");
        }
      });
    } catch (error) {
      console.error("Error registering admin user:", error);
      showErrorToast("An error occurred. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const hasImage = !!existingImageUrl || !!imagePreview;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="fullName"
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter name"
                    className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="email"
                    placeholder="Enter email"
                    className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role Select */}
          <FormField
            control={form.control}
            name="roleId"
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Role <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                  >
                    <option value="">Select a role</option>
                    {roleData.map((role: { id: string; name: string }) => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full bg-transparent border-b border-gray-200 py-2 pr-10 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPassword(!showPassword);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            rules={{
              required: "Please confirm your password",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Confirm Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className="w-full bg-transparent border-b border-gray-200 py-2 pr-10 focus:outline-none focus:border-[#0f3d3e] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Single Image Upload Field */}
        <div className="space-y-4 mt-6">
          <label className="text-sm font-medium text-gray-700">
            Upload Profile Photo
          </label>
          <div className={`w-full max-w-sm border-2 border-dashed ${isUploading ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-[#0f3d3e]'} rounded-xl p-6 transition-colors relative flex justify-center items-center min-h-[160px]`}>
            {imagePreview ? (
              <div className="relative aspect-square w-32 group">
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
              <div className="relative aspect-square w-32 group">
                <Image
                  src={existingImageUrl}
                  alt="Existing Logo"
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
                  Click to upload photo
                </h3>
                <p className="text-xs text-gray-500">
                  Profile image (1 limit)
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
               💡 You can remove the current image to upload a new one
             </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={isPending || isUploading}
            className="flex items-center gap-2 bg-[#0f3d3e] text-white px-6 py-2 rounded-lg hover:bg-[#0f3d3e]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span className="font-medium">
              {isUploading 
                ? "Uploading..." 
                : isPending
                  ? "Saving..."
                  : "Save"
              }
            </span>
          </button>
          <Link
            href="/dashboard/roles_permissions"
            className="flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
            Close
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default AdminUserForm;
