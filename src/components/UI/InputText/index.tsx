import React from 'react';

interface CheckboxProps {
  className?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  icon?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText: React.FC<CheckboxProps> = ({ className = '', label = '', icon = '', placeholder = '', value='', onChange }) => {
  return (
    <div className={`flex flex-col justify-center px-4 gap-[16px] ${className}`}>
      <label className="poppins-17 negro">{label}</label>
      <div className='flex items-center gap-[8px] py-[10px] px-[10px] bg-gris-claro rounded-[5px]'>
        <img src={icon} alt="" />
        <input type="text" className='bg-transparent poppins-16 negro w-full' placeholder={placeholder} value={value} onChange={onChange}/>
      </div>
    </div>
  );
};

export default InputText;