
const ContactHeader = () => {
    return (
        <div className="flex flex-col items-center justify-center py-8">
            <div className="flex items-center gap-2 mb-2">
                <svg width="36" height="36" fill="#FFC107" viewBox="0 0 24 24">
                    <path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.05 10.74 8.13 11.54.53.39 1.21.39 1.74 0C13.95 21.74 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 17.88C10.07 18.13 5 14.11 5 11c0-3.87 3.13-7 7-7s7 3.13 7 7c0 3.11-5.07 7.13-7 8.88zM12 6.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S13.38 6.5 12 6.5zm0 3c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z" />
                </svg>
                <span className="text-lg md:text-xl font-medium text-gray-700">আমাদের সাথে যোগাযোগ করুন</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f3d3e] text-center leading-tight">
                আমরা আপনার কাছ থেকে শুনতে চাই
            </h2>
        </div>
    );
};

export default ContactHeader;
