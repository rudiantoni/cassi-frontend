import { useEffect } from "react";
import { IContactInput, IProvider } from "../services/Interfaces";
import { Util } from "../services/Util";
import InputText from "./Input/InputText/InputText";
import InputMasked from "./Input/InputMasked/InputMasked";

interface FormStageContactProps {
  setIsInputValid: React.Dispatch<React.SetStateAction<boolean>>;
  inputData: IProvider;
  setInputData: React.Dispatch<React.SetStateAction<IProvider>>;
}

const FormStageContact: React.FC<FormStageContactProps> = ({ setIsInputValid, inputData, setInputData}) => {
  
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name;

    if (name === "data-input-contact-name") {
      const value: string = event.target.value;
      const newContact: IContactInput = { ...inputData.contact, name: value };
      setInputData({...inputData, contact: newContact});
    } else if (name === "data-input-contact-mobile") {
      const value: string = event.target.value;
      const phoneNumbersOnly: string = Util.extractNumbers(value);
      const newContact: IContactInput = { ...inputData.contact, phoneMobileInput: value, phoneMobile: phoneNumbersOnly };
      setInputData({...inputData, contact: newContact});
    } else if (name === "data-input-contact-residential") {
      const value: string = event.target.value;
      const phoneNumbersOnly: string = Util.extractNumbers(value);
      const newContact: IContactInput = { ...inputData.contact, phoneResidentialInput: value, phoneResidential: phoneNumbersOnly };
      setInputData({...inputData, contact: newContact});
    } else if (name === "data-input-contact-mail") {
      const value: string = event.target.value;
      const newContact: IContactInput = { ...inputData.contact, mail: value };
      setInputData({...inputData, contact: newContact});
    }

  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  useEffect(() => {
    const validateInputData = (inputData: IContactInput): void => {
      const isInputContactNameValid = Util.stringHasValue(inputData.name)
      const isInputContactPhoneValid =
        (Util.stringHasValue(inputData.phoneMobile) && inputData.phoneMobile!.length >= 10) || 
        (Util.stringHasValue(inputData.phoneResidential) && inputData.phoneResidential!.length >= 10)
      const isInputContactEmailValid = Util.stringHasValue(inputData.mail) && isValidEmail(inputData.mail!)
      const result = isInputContactNameValid && isInputContactPhoneValid && isInputContactEmailValid
      setIsInputValid(result)
    }

    validateInputData(inputData.contact ?? {})
  }, [inputData.contact, setIsInputValid]);

  return (
    <>
      <div style={{ marginTop: '30px', marginBottom: '30px'}}>
        <InputText field="data-input-contact-name" label="Nome para contato" isRequired={true}
          placeholder="Informe o nome..." value={inputData.contact?.name ?? ''} onChange={onChangeInput}
        />     
      </div>

      <div style={{display: 'flex', gap: '15px' }}>
        <div style={{flexGrow: '1'}}>
          <InputMasked field="data-input-contact-mobile" label={"Telefone Celular"}
            inputMask={"(99) 9 9999-9999"} placeholder="(00) 0 0000-0000"
            value={inputData.contact?.phoneMobileInput ?? ''} onChange={onChangeInput}
          />
        </div>
        <div style={{flexGrow: '1'}}>
          <InputMasked field="data-input-contact-residential" label={"Telefone Fixo"}
            inputMask={"(99) 9 9999-9999"} placeholder="(00) 0 0000-0000"
            value={inputData.contact?.phoneResidentialInput ?? ''} onChange={onChangeInput}
          />
        </div>
      </div>
      <p style={{color: 'var(--dark-grey)', fontSize: '10px', marginBottom: '30px'}}>(Obrigatório informar pelo menos um telefone)</p>

      <div>
        <InputText field="data-input-contact-mail" label="E-mail" isRequired={true}
          placeholder="Informe o e-mail..." value={inputData.contact?.mail ?? ''} onChange={onChangeInput}
        />
      </div>
    </>
  );
};

export default FormStageContact;
