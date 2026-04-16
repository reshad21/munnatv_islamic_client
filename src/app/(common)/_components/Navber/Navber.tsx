import DynamicLogo from "./DynamicLogo";
import NavberClient from "./NavberClient";

const Navber = () => {
  return (
    <nav className="w-full bg-white border-b relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-2 md:px-8 py-2">
        {/* Logo - Server Component */}
        <DynamicLogo />
        
        {/* Client-side Navigation */}
        <NavberClient />
      </div>
    </nav>
  );
};

export default Navber;