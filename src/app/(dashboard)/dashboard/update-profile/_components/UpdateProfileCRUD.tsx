"use client";

import { updateProfile } from "@/services/auth";
import { Save, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export interface UpdateProfileFormData {
  id?: string;
  email: string;
  fullName: string;
  role?: string;
  status?: string;
  profilePhoto?: string | null;
  phoneNumber?: string;
  image?: File | null;
  password?: string;
  newPassword?: string;
  retypePassword?: string;
}

const UpdateProfileCRUD = ({ profileData }: { profileData: UpdateProfileFormData }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    profileData.profilePhoto || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<UpdateProfileFormData>({
    defaultValues: {
      id: profileData.id || "",
      fullName: profileData.fullName || "",
      phoneNumber: profileData.phoneNumber || "",
      email: profileData.email || "",
      role: profileData.role || "",
      status: profileData.status || "",
      profilePhoto: profileData.profilePhoto || null,
      image: null,
      password: "",
      newPassword: "",
      retypePassword: "",
    },
  });

  // Watch password fields for validation
  const newPassword = watch("newPassword");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(profileData.profilePhoto || null);
    }
  };

  const removeImage = () => {
    setValue("image", null);
    setImagePreview(null);
  };

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      setIsSubmitting(true);

      // Validate password fields if any password field is filled
      if (data.password || data.newPassword || data.retypePassword) {
        if (!data.password) {
          alert("Please enter your old password");
          return;
        }
        if (!data.newPassword) {
          alert("Please enter a new password");
          return;
        }
        if (data.newPassword !== data.retypePassword) {
          alert("New password and re-typed password do not match");
          return;
        }
        if (data.newPassword.length < 6) {
          alert("New password must be at least 6 characters long");
          return;
        }
      }

      // Prepare form data for submission
      const formData = new FormData();
      
      // Extract user ID
      const userId = data.id || profileData.id || "";
      
      // Add all fields to FormData
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber || "");
      
      // Add password fields only if they're filled
      if (data.password) {
        formData.append("password", data.password);
        formData.append("newPassword", data.newPassword || "");
      }
      
      // Add image file if new image is uploaded
      if (data.image) {
        formData.append("image", data.image);
      }

      // Call the API function with id as first argument
      await updateProfile(userId, formData);
      
      console.log("Profile updated successfully!");
      // You can add success notification here
      
    } catch (error) {
      console.error("Error updating profile:", error);
      // You can add error notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <Controller
          name="fullName"
          control={control}
          rules={{ required: "Full Name is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="write here..."
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e]"
              value={field.value ?? ''}
            />
          )}
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Phone Number</label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="write here..."
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e]"
              value={field.value ?? ''}
            />
          )}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <Controller
          name="email"
          control={control}
          rules={{ 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          }}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              placeholder="write here..."
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0f3d3e]"
              value={field.value ?? ''}
            />
          )}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Password Section */}
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password (Optional)</h3>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Old Password</label>
          <div className="relative">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type={showOldPassword ? "text" : "password"}
                  placeholder="write here..."
                  className="w-full border-b border-gray-200 py-2 pr-10 focus:outline-none focus:border-[#0f3d3e]"
                  value={field.value ?? ''}
                />
              )}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">New Password</label>
          <div className="relative">
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="write here..."
                  className="w-full border-b border-gray-200 py-2 pr-10 focus:outline-none focus:border-[#0f3d3e]"
                  value={field.value ?? ''}
                />
              )}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Re-Type Password</label>
          <div className="relative">
            <Controller
              name="retypePassword"
              control={control}
              rules={{
                validate: (value) => {
                  if (newPassword && value !== newPassword) {
                    return "Passwords do not match";
                  }
                  return true;
                }
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type={showRetypePassword ? "text" : "password"}
                  placeholder="write here..."
                  className="w-full border-b border-gray-200 py-2 pr-10 focus:outline-none focus:border-[#0f3d3e]"
                  value={field.value ?? ''}
                />
              )}
            />
            <button
              type="button"
              onClick={() => setShowRetypePassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          {errors.retypePassword && <p className="text-red-500 text-sm mt-1">{errors.retypePassword.message}</p>}
        </div>
      </div>

      {/* Image Upload */}
      <div className="mb-4 flex flex-col items-center border-t border-gray-200 pt-6 mt-6">
        <label className="block text-gray-700 mb-2">Profile Photo</label>
        <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#0f3d3e] transition-colors relative overflow-hidden">
          {imagePreview ? (
            <Image src={imagePreview} alt="Preview" fill className="object-cover rounded-lg" unoptimized />
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-500 mt-2">Upload</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {imagePreview && (
          <button
            type="button"
            onClick={removeImage}
            className="mt-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-[#0f3d3e] text-white px-6 py-2 rounded-lg hover:bg-[#0f3d3e]/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? "Saving..." : "Save"}
        </button>
        <Link
          href="/dashboard/update-profile"
          className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
          Close
        </Link>
      </div>
    </form>
  );
};

export default UpdateProfileCRUD;