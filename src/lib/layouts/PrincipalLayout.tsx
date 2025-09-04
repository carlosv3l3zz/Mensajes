import type { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar';

interface DashboardLayout {
  children: ReactNode;
}

const PrincipalLayout = ({ children }: DashboardLayout) => {
  return (
    <div className="flex bg-[#FFF] h-screen w-screen panel">
        <div className="">
            <Sidebar />
        </div>
        <div className="rounded-[25px] bg-blanco shadow-[0_258px_72px_0_rgba(173,173,173,0),0_165px_66px_0_rgba(173,173,173,0.01),0_93px_56px_0_rgba(173,173,173,0.05),0_41px_41px_0_rgba(173,173,173,0.09),0_10px_23px_0_rgba(173,173,173,0.10)] my-[20px] mr-[30px] w-full h-[96%] overflow-hidden">
            
            {children}

        </div>
    </div> 
  );
};

export default PrincipalLayout;