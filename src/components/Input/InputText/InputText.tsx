import { InputHTMLAttributes } from "react";
import styles from './InputText.module.css';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  field: string;
  label: string;
  isRequired?: boolean;
}

const InputText: React.FC<InputTextProps> = ({ field, label, isRequired = false, ...props }) => {
  return (
    <label className={styles['container']}>
      <span className={styles['label']}>{isRequired ? '* ' : ''}{label}</span>
      <input id={field} name={field} type="text" {...props} />
    </label>
  );
};

export default InputText;
