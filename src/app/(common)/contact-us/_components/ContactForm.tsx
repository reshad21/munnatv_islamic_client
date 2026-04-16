"use client";

import { createContacts } from "@/services/contacts";
import { Controller, useForm } from "react-hook-form";


interface ContactFormData {
    fullName: string;
    subject: string;
    email: string;
    phone: string;
    country: string;
    message: string;
}

const ContactForm = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
        defaultValues: {
            fullName: '',
            subject: '',
            email: '',
            phone: '',
            country: '',
            message: '',
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        // handle form submission (e.g., send to API)
        const payload: ContactFormData = {
            ...data
        };
        const res = await createContacts(payload);
        console.log("contact page form == >", res);
        reset();
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="fullName"
                control={control}
                rules={{ required: "Full Name is required" }}
                render={({ field }) => (
                    <div>
                        <input {...field} type="text" placeholder="Full Name" className="w-full border border-yellow-500 rounded-md px-4 py-3 focus:outline-none focus:border-yellow-700" />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                    </div>
                )}
            />
            <Controller
                name="subject"
                control={control}
                rules={{ required: "Subject is required" }}
                render={({ field }) => (
                    <div>
                        <input {...field} type="text" placeholder="Subject" className="w-full border border-yellow-500 rounded-md px-4 py-3 focus:outline-none focus:border-yellow-700" />
                        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                    </div>
                )}
            />
            <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                    <div>
                        <input {...field} type="email" placeholder="Email" className="w-full border border-yellow-500 rounded-md px-4 py-3 focus:outline-none focus:border-yellow-700" />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                )}
            />
            <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone is required" }}
                render={({ field }) => (
                    <div>
                        <input {...field} type="text" placeholder="Phone" className="w-full border border-yellow-500 rounded-md px-4 py-3 focus:outline-none focus:border-yellow-700" />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                )}
            />
            <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                    <div>
                        <input {...field} type="text" placeholder="Country" className="w-full border border-yellow-500 rounded-md px-4 py-3 focus:outline-none focus:border-yellow-700" />
                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                    </div>
                )}
            />
            <Controller
                name="message"
                control={control}
                rules={{ required: "Message is required" }}
                render={({ field }) => (
                    <div>
                        <textarea {...field} placeholder="Message" rows={5} className="w-full border border-yellow-500 rounded-md px-4 py-3 focus:outline-none focus:border-yellow-700" />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                    </div>
                )}
            />
            <button type="submit" className="w-full bg-yellow-700 text-white font-bold py-3 rounded-md mt-2 hover:bg-yellow-800 transition cursor-pointer">Send</button>
        </form>
    );
};

export default ContactForm;
