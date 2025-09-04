import React, { useState } from "react";
import { Link } from "react-router-dom";
import SidebarItems from "@/lib/constants/SidebarItems";
import "./css/styles.css";

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    return savedState === "true";
  });

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState.toString());
  };

  const getSelectedLink = (path: string): string => {
    const location = window.location.pathname;
    return location === path ? "selected blanco selected-logo" : "negro";
  };

  const getSelectedSvg = (path: string): string => {
    const location = window.location.pathname;
    return location === path
      ? `/svg/SidebarIcons/${path.replace("/", "")}hover.svg`
      : `/svg/SidebarIcons/${path.replace("/", "")}.svg`;
  };

  const logout = () => {
    localStorage.removeItem("authResponse");
    window.location.href = "/login";
  };

  return (
    <div className={`${isCollapsed ? "sidebar-hidden" : "sidebar"} relative`}>
      <img
        src="/svg/SidebarIcons/collapse.svg"
        className="colapse"
        onClick={toggleSidebar}
      />

      <div className="w-full h-full px-[40px] py-[46px] flex flex-col gap-4 justify-start items-start">
        <img
          src="/svg/logos/full-logo-negro.svg"
          className="w-[249px] logo-nocolapse"
        />
        <img
          src="/svg/logos/logo-negro.svg"
          className="w-[249px] logo-colapse"
        />

        <div className="h-[90%] flex flex-col w-full justify-start items-start gap-2">
          {SidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${getSelectedLink(
                item.path
              )} flex items-center gap-2 py-[8px] poppins-17 sidebar-link w-full`}
            >
              <img src={getSelectedSvg(item.path)} className="noselected-img w-4.5" />
              <img
                src={`/svg/SidebarIcons/${item.path.replace("/", "")}.svg`}
                className="selected-img w-4.5"
              />
              <p className="textos-14-semibold content-siddebar-cel">
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={logout}
        >
          <img src="/svg/SidebarIcons/close-session.svg" alt="" />
          <p className="negro poppins-17">Cerrar Sesion</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
