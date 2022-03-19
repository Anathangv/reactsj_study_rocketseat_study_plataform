import React, {SelectHTMLAttributes} from 'react';

import './styles.css'

interface SelectPorps extends SelectHTMLAttributes<HTMLSelectElement>{
  label: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectPorps> = ({label, name, options, ...rest }) => {
  return(
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        <option value="" disabled selected hidden>Selecione uma opção</option>
        {options.map( option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })}
      </select>
    </div>
  );
}

export default Select;