import { InputHTMLAttributes } from "react";
import { ISelectItem } from "../../../services/Interfaces";
import styles from "./InputSelect.module.css"

interface InputSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  field: string;
  label: string;
  placeholder: string;
  options: ISelectItem[];
  isRequired?: boolean;
}

const InputSelect: React.FC<InputSelectProps> = ({ field, label, placeholder, options, isRequired = false, ...props }) => {
  return (
    <div className={styles['container']}>
      <label className={styles['label']} htmlFor={field}>{isRequired ? '* ' : ''}{label}</label>
      <select id={field} name={field} {...props}>
        <option value="undefined" >{placeholder}</option>
        {options.map((item: ISelectItem, index: number) => (
          <option key={index} value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
