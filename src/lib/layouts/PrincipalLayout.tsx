import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

interface DashboardLayout {
  children: ReactNode;
}

const PrincipalLayout = ({ children }: DashboardLayout) => {
  return (
    <div className="flex bg-[#000] h-screen w-screen">
      <div className="">
        <Sidebar />
      </div>
      <div className="rounded-[25px] bg-negro shadow-[0_258px_72px_0_rgba(173,173,173,0),0_165px_66px_0_rgba(173,173,173,0.01),0_93px_56px_0_rgba(173,173,173,0.05),0_41px_41px_0_rgba(173,173,173,0.09),0_10px_23px_0_rgba(173,173,173,0.10)] my-[1%] mr-[2%] w-full h-[96%] overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default PrincipalLayout;
