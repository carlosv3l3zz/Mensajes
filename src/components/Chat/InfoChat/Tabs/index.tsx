import React from "react";
import type { TabsProps } from "@/lib/types/Chat";

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex">
      <button
        onClick={() => setActiveTab("info")}
        className={`flex-1 py-3 px-4 poppins-14 font-medium border-b-2 transition-colors ${
          activeTab === "info"
            ? "border-[#b60000] rojo"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        Información
      </button>
      {/*
      <button
        onClick={() => setActiveTab("activity")}
        className={`flex-1 py-3 px-4 poppins-14 font-medium border-b-2 transition-colors ${
          activeTab === "activity"
            ? "border-[#b60000] rojo2"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        Actividad
      </button>
      */}
    </div>
  );
};

export default Tabs;
