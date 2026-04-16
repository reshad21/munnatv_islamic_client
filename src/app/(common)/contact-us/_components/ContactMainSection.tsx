import Image from "next/image";
import contactImage from "../../../../../public/Group 33.png";
import ContactForm from "./ContactForm";
const ContactMainSection = () => {
    return (
        <div className="bg-[#FFEDBC] py-10">
            <div className="max-w-6xl mx-auto bg-white rounded-3xl flex flex-col md:flex-row overflow-hidden shadow-md">
                {/* Left: Info & Social */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl font-light mb-2">
                            Lets Get in <span className="text-yellow-600 font-bold">Touch!</span>
                        </h2>
                        <ul className="mb-6 space-y-2 text-gray-600">
                            <li className="flex items-center gap-2">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" /></svg>
                                +88 1768 1718 604
                            </li>
                            <li className="flex items-center gap-2">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /><path d="M22 6l-10 7L2 6" /></svg>
                                support@gmail.com
                            </li>
                            <li className="flex items-center gap-2">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a8 8 0 1 0-1.414 1.414l4.243 4.243a1 1 0 0 0 1.414-1.414z" /></svg>
                                Al-Masjid Al-Haram Street No. 27, Makkah, Saudi Arabia
                            </li>
                        </ul>
                        <div className="flex gap-3 mb-6">
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded bg-yellow-500 text-white"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0" /></svg></a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded bg-yellow-500/20 text-gray-500"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 10.268h-3v-4.604c0-1.099-.021-2.513-1.532-2.513-1.532 0-1.768 1.197-1.768 2.434v4.683h-3v-9h2.881v1.233h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.6v4.73z" /></svg></a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded bg-yellow-500/20 text-gray-500"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-7 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.604c0-1.099-.021-2.513-1.532-2.513-1.532 0-1.768 1.197-1.768 2.434v4.683h-3v-9h2.881v1.233h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.6v4.73z" /></svg></a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded bg-yellow-500/20 text-gray-500"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186c-.835.37-1.732.62-2.675.732.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.906-2.062-1.474-3.404-1.474-2.577 0-4.667 2.09-4.667 4.667 0 .366.041.723.12 1.066-3.88-.195-7.318-2.054-9.62-4.88-.402.69-.632 1.49-.632 2.347 0 1.62.825 3.05 2.08 3.89-.765-.025-1.484-.234-2.113-.584v.06c0 2.263 1.61 4.15 3.747 4.58-.392.107-.805.164-1.23.164-.301 0-.593-.029-.877-.083.594 1.853 2.318 3.2 4.363 3.236-1.599 1.253-3.617 2.001-5.813 2.001-.378 0-.75-.022-1.116-.065 2.072 1.33 4.533 2.106 7.184 2.106 8.62 0 13.344-7.144 13.344-13.344 0-.204-.005-.408-.014-.61.916-.661 1.71-1.49 2.34-2.436z" /></svg></a>
                        </div>
                    </div>
                    <div className="flex justify-center items-end mt-4">
                        <Image
                            src={contactImage}
                            alt="Contact"
                            width={320}
                            height={320}
                            className="w-72 md:w-80 object-contain"
                            priority
                            unoptimized
                        />
                    </div>
                </div>
                {/* Right: Form */}
                <div className="flex-1 p-8 flex flex-col justify-center">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default ContactMainSection;
