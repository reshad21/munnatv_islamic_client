"use client";

import { createContacts } from "@/services/contacts";
import { Controller, useForm } from "react-hook-form";
import contactImage from "../../../../../../public/Image (2).png";
import Image from "next/image";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";

interface ContactFormData {
  fullName: string;
  subject: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

const PackageContactForm = ({
  dynamicClassName,
}: {
  dynamicClassName?: string;
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      fullName: "",
      subject: "",
      email: "",
      phone: "",
      country: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    const payload: ContactFormData = {
      ...data,
    };
    const res = await createContacts(payload);
    if (res.statusCode === 201) {
      showSuccessToast(res.message);
      reset();
    } else {
      showErrorToast(res.message);
    }
    reset();
  };

  return (
    <div
      className={`border border-[#FFC72C] p-4 md:p-6 w-full max-w-[430px] mx-auto h-fit rounded-lg ${
        dynamicClassName ?? ""
      }`}
    >
      <div className="flex flex-col items-center mb-4">
        <h2
          className="text-[#0f3d3e] text-2xl font-bold w-full text-center mb-2"
          style={{ fontFamily: "Poppins, Tiro Bangla, sans-serif" }}
        >
          আমাদের সাথে যোগাযোগ করুন
        </h2>
        <div className="relative w-full flex justify-center mb-2">
          <Image
            src={contactImage}
            alt="Contact"
            className="w-full h-auto rounded-none"
            style={{ maxWidth: 370, background: "none" }}
            unoptimized
          />
        </div>
      </div>
      <div className="border-t border-[#FFC72C] mb-6"></div>
      <div className="mb-2">
        <h3
          className="text-[#0f3d3e] text-xl font-bold mb-1"
          style={{ fontFamily: "Poppins, Tiro Bangla, sans-serif" }}
        >
          তোমার পবিত্র যাত্রা শুরু করো।
        </h3>
        <p
          className="text-[#0f3d3e] text-base mb-4"
          style={{ fontFamily: "Poppins, Tiro Bangla, sans-serif" }}
        >
          কোন প্রশ্ন আছে?
        </p>
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="fullName"
          control={control}
          rules={{ required: "Full Name is required" }}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="text"
                placeholder="Name"
                className="w-full border border-[#FFC72C] rounded-md px-4 py-3 text-[#fff] placeholder:text-[#888] focus:outline-none focus:border-[#FFC72C] transition"
                style={{ fontFamily: "Poppins, Tiro Bangla, sans-serif" }}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="subject"
          control={control}
          rules={{ required: "Subject is required" }}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="text"
                placeholder="Subject"
                className="w-full border border-[#FFC72C] rounded-md px-4 py-3 text-[#fff] placeholder:text-[#888] focus:outline-none focus:border-[#FFC72C] transition"
                style={{ fontFamily: "Poppins, Tiro Bangla, sans-serif" }}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="email"
                placeholder="Email"
                className="w-full border border-[#FFC72C] rounded-md px-4 py-3 text-[#fff] placeholder:text-[#888] focus:outline-none focus:border-[#FFC72C] transition"
                style={{ fontFamily: "Poppins, Tiro Bangla, sans-serif" }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="phone"
          control={control}
          rules={{ required: "Phone is required" }}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="text"
                placeholder="Phone"
                className="w-full border border-[#FFC72C] rounded-md px-4 py-3 text-[#fff] placeholder:text-[#888] focus:outline-none focus:border-[#FFC72C] transition"
                style={{ fontFamily: "Poppins, Tiro Bangla, sans-serif" }}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="country"
          control={control}
          rules={{ required: "Country is required" }}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="text"
                placeholder="Country"
                className="w-full border border-[#FFC72C] rounded-md px-4 py-3 text-[#fff] placeholder:text-[#888] focus:outline-none focus:border-[#FFC72C] transition"
                style={{ fontFamily: "Poppins, Tiro Bangla, sans-serif" }}
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="message"
          control={control}
          rules={{ required: "Message is required" }}
          render={({ field }) => (
            <div>
              <textarea
                {...field}
                placeholder="Message"
                rows={5}
                className="w-full border border-[#FFC72C] rounded-md px-4 py-3 text-[#fff] placeholder:text-[#888] focus:outline-none focus:border-[#FFC72C] transition"
                style={{ fontFamily: "Poppins, Tiro Bangla, sans-serif" }}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
          )}
        />
        <button
          type="submit"
          className="w-full flex items-center justify-between bg-[#D19A00] hover:bg-[#FFC72C] text-white font-semibold text-lg py-4 px-6 rounded-full mt-2 transition cursor-pointer group"
          style={{ fontFamily: "Poppins, Tiro Bangla, sans-serif" }}
        >
          <span>Send</span>
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFC72C] group-hover:bg-[#D19A00] ml-2 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m0 0-6-6m6 6-6 6"
              />
            </svg>
          </span>
        </button>
      </form>
    </div>
  );
};

export default PackageContactForm;
