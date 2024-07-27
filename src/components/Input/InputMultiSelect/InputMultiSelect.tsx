import { MultiSelect } from "react-multi-select-component";
import { ISelectItem } from "../../../services/Interfaces";
import styles from "./InputMultiSelect.module.css"

interface MultiInputSelectProps {
  label: string;
  placeholder: string;
  options: ISelectItem[];
  selectedOptions: ISelectItem[];
  isRequired?: boolean;
  onChange?: (value: ISelectItem[]) => void
}

const InputMultiSelect: React.FC<MultiInputSelectProps> = ({ label, placeholder, options, selectedOptions, isRequired = false, onChange }) => {

  const inputLabel: string = `${isRequired ? '* ' : ''}${label}`

  return (
    <div className="input-multiselect-container">
      <label className={styles['label']}>{inputLabel}</label>
      <MultiSelect hasSelectAll={false} disableSearch={true} labelledBy={inputLabel}
        overrideStrings={{"selectSomeItems": placeholder}}
        options={options} value={selectedOptions} onChange={onChange} />
    </div>
  );
};

export default InputMultiSelect;
