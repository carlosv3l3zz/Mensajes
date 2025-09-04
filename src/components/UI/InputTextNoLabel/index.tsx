import React from 'react';

interface CheckboxProps {
  className?: string;
  placeholder?: string;
  value?: string;
  icon?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputTextNoLabel: React.FC<CheckboxProps> = ({ className = '', icon = '', placeholder = '', value='', onChange }) => {
  return (
    <div className={`flex items-center border-b pb-[6px] ${className}`}>
        <div className='flex items-center gap-[10px] px-[10px]'>
          <img src={icon} alt="" />
          <input type="text" className='bg-transparent poppins-16 negro w-full' placeholder={placeholder} value={value} onChange={onChange}/>
        </div>
    </div>
  );
};

export default InputTextNoLabel;