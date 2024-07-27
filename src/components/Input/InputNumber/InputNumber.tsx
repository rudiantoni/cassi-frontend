import { InputHTMLAttributes } from "react";
import styles from './InputNumber.module.css';

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  field: string;
  label: string;
  isRequired?: boolean;
}

const InputNumber: React.FC<InputNumberProps> = ({ field, label, isRequired = false, ...props }) => {
  return (
    <label className={styles['container']}>
      <span className={styles['label']}>{isRequired ? '* ' : ''}{label}</span>
      <input id={field} name={field} type="number" {...props} />
    </label>
  );
};

export default InputNumber;
