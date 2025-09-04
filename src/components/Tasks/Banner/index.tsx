import React from "react";

interface BannerProps {
  background?: string;
  label?: string;
  icon?: string;
  onClick?: () => void;
}

export const Banner: React.FC<BannerProps> = ({
  background = "",
  label = "",
  icon = "",
  onClick = () => {},
}) => {
  return (
    <div
      className="w-full h-[20%] max-h-[161px] !bg-cover !bg-center rounded-t-[25px] flex justify-between items-start"
      style={{ background: `url(${background})` }}
    >
      <div className="flex justify-between items-start w-full h-full px-[45px] py-[20px] gap-2">
        <div className="flex flex-col justify-between items-start h-full">
          <div className="flex items-center justify-start gap-4">
            <img src={icon} className="w-[30px]" />
            <p className="blanco poppins-32">{label}</p>
          </div>
        </div>
        <div className="w-full h-full flex justify-end items-end">
            <button
              className="bg-azul-principal text-white px-4 py-2 rounded-md"
              onClick={onClick}
            >
              <img src={icon} className="w-[30px]" />
              {label}
            </button>
          </div>
      </div>
    </div>
  );
};

export default Banner;
