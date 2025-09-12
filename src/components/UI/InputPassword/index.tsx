import React, {useState} from 'react';

interface CheckboxProps {
  className?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  icon?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: string;
}

const InputPassword: React.FC<CheckboxProps> = ({ className = '', label = '', icon = '', placeholder = '', value='', onChange, color= 'fff' }) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const showPass = () => {
        setShowPassword((prev) => !prev);
    };
    

  return (
    <div className={`flex flex-col justify-center px-4 gap-4 ${className}`}>
        <label className={`poppins-17 blanco`}>{label}</label>
        <div className={`flex items-center gap-[8px] p-2.5 border-b border-[#fff]`}>
            <img src={icon} alt="" />
            <input type={showPassword ? 'text' : 'password'} className={`bg-transparent poppins-16 ${color=== 'blanco' ? 'blanco placeholder:text-white' : 'negro'} w-full placeholder:text-[#fff]`} placeholder={placeholder} value={value} onChange={onChange}/>
            <img src={showPassword ? '/svg/login/eye-selected.svg' : '/svg/login/eye.svg'} className="cursor-pointer w-6" onClick={showPass}/>
        </div>
    </div>
  );
};

export default InputPassword;