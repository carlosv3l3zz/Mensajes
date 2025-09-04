import React, { useState } from "react";
import Banner from "@/components/Tasks/Banner";
import DetailTasksDrawer from "@/components/Drawers/Tasks/DetailTask";

export const Tasks: React.FC = () => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Banner
        background={"/images/Users/Banner.png"}
        label={"Tareas"}
        icon={"/svg/icons/tasksBanner.svg"}
        onClick={() => setOpenDetail(true)}
      />

      {/*Drawers*/}
      <DetailTasksDrawer
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        width="30%"
        height="100%"
      />
    </div>
  );
};

export default Tasks;
