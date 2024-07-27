import { InputHTMLAttributes } from "react";
import { ISelectItem } from "../../../services/Interfaces";
import styles from './InputRadio.module.css';

interface InputRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  field: string;
  label: string;
  value: string;
  options: ISelectItem[];
  isRequired?: boolean;
}

const InputRadio: React.FC<InputRadioProps> = ({ field, label, value, options, isRequired = false, ...props }) => {
  return (
    <div className={styles['container']}>
      <span className={styles['label']}>{isRequired ? '* ' : ''}{label}</span>
      <div className={styles['input-group-container']}>
        {options.map((item: ISelectItem, index: number) => (
          <label key={index} className={styles['radio-container']}>
            <input id={field} name={field} type="radio"
              value={item.value} checked={value === item.value} {...props}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default InputRadio;
