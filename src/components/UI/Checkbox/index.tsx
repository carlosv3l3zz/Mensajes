import React from 'react';
import './css/styles.css'
interface CheckboxProps {
  className?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ className = '', label = '', checked=false, onChange, disabled=false }) => {
  return (
    <div className="checkbox-wrapper-46 flex items-center">
      <input type="checkbox" id="cbx-46" className="inp-cbx" checked={checked} onChange={onChange} disabled={disabled}/>
      <label htmlFor="cbx-46" className="cbx flex items-center">
        <span>
          <svg viewBox="0 0 12 10" height="10px" width="12px">
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </svg>
        </span>
        <span className={className}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;