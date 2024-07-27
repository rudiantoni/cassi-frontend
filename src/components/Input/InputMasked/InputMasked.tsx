import InputMask from 'react-input-mask';
import styles from "./InputMasked.module.css"

interface InputMaskedProps {
  field: string;
  label: string;
  inputMask: string;
  placeholder?: string;
  isRequired?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

const InputMasked: React.FC<InputMaskedProps> = ({ value, field, label, inputMask, placeholder, isRequired = false, onChange }) => {
  return (
    <label className={styles['container']}>
      <span className={styles['label']}>{isRequired ? '* ' : ''}{label}</span>
      <InputMask id={field} name={field} autoComplete="off" mask={inputMask} placeholder={placeholder} 
        value={value} onChange={onChange}
      />
    </label>
  );
};

export default InputMasked;
