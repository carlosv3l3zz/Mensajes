import React from "react";
import { Drawer } from "antd";
import "@/css/drawers.css";
import Activity from "./Activity";

interface DetailTaskDrawerProps {
  width?: string;
  height?: string;
  onClose?: () => void;
  open?: boolean;
}

const DetailTaskDrawer: React.FC<DetailTaskDrawerProps> = ({
  width = "50%",
  height = "80%",
  open = false,
  onClose = () => {},
}) => {
  return (
    <Drawer
      width={width}
      height={height}
      onClose={onClose}
      open={open}
      className="styled-drawer rounded-[10px] "
    >
      <div className="flex flex-col w-full h-full justify-start items-start">
        <div className="w-full h-full">
          <Activity />
        </div>
      </div>
    </Drawer>
  );
};

export default DetailTaskDrawer;
