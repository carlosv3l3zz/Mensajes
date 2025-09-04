import React, {useState} from 'react';

interface CheckboxProps {
  className?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  icon?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputPassword: React.FC<CheckboxProps> = ({ className = '', label = '', icon = '', placeholder = '', value='', onChange }) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    

    const showPass = () => {
        setShowPassword((prev) => !prev);
    };

  return (
    <div className={`flex flex-col justify-center px-4 gap-[16px] ${className}`}>
        <label className="poppins-17 negro">{label}</label>
        <div className='flex items-center gap-[8px] py-[10px] px-[10px] bg-gris-claro rounded-[5px]'>
            <img src={icon} alt="" />
            <input type={showPassword ? 'text' : 'password'} className='bg-transparent poppins-16 negro w-full' placeholder={placeholder} value={value} onChange={onChange}/>
            <img src={showPassword ? '/svg/icons/eye-selected.svg' : '/svg/icons/eye.svg'} className="cursor-pointer" onClick={showPass}/>
        </div>
    </div>
  );
};

export default InputPassword;