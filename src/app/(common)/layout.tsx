import Footer from "@/components/shared/Footer";
import Topber from "@/components/shared/menu/Topber";
import Navber from "./_components/Navber/Navber";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Topber />
      <Navber />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
