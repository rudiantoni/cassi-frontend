import { useEffect, useState } from "react";
import { IAddressInput, IProvider, ISelectItem, IUf } from "../services/Interfaces";
import { TMockResponseData } from "../services/Types";
import { Util } from "../services/Util";
import InputMasked from "./Input/InputMasked/InputMasked";
import InputSelect from "./Input/InputSelect/InputSelect";
import InputText from "./Input/InputText/InputText";
import { get } from "../services/Api";
import InputNumber from "./Input/InputNumber/InputNumber";

interface FormStageAddressProps {
  setIsInputValid: React.Dispatch<React.SetStateAction<boolean>>;
  inputData: IProvider;
  setInputData: React.Dispatch<React.SetStateAction<IProvider>>;
}

const FormStageAddress: React.FC<FormStageAddressProps> = ({ setIsInputValid, inputData, setInputData}) => {
  
  const [ufOptions, setUfOptions] = useState<ISelectItem[]>([]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name;

    if (name === "data-input-zip-code") {
      const value: string = event.target.value;
      const zipCodeNumbersOnly: string = Util.extractNumbers(value);
      const newAddress: IAddressInput = { ...inputData.address, zipCodeInput: value, zipCode: zipCodeNumbersOnly};
      setInputData({...inputData, address: newAddress});
    } else if (name === "data-input-address") {
      const value: string = event.target.value;
      const newAddress: IAddressInput = { ...inputData.address, address: value };
      setInputData({...inputData, address: newAddress});
    } else if (name === "data-input-city") {
      const value: string = event.target.value;
      const newAddress: IAddressInput = { ...inputData.address, city: value };
      setInputData({...inputData, address: newAddress});
    } else if (name === "data-input-district") {
      const value: string = event.target.value;
      const newAddress: IAddressInput = { ...inputData.address, district: value };
      setInputData({...inputData, address: newAddress});
    } else if (name === "data-input-number") {
      if (Util.stringHasValue(event.target.value)) {
        const value: string = event.target.value;
        const newAddress: IAddressInput = { ...inputData.address, number: Number(value) };
        setInputData({...inputData, address: newAddress});
      } else {
        const newAddress: IAddressInput = { ...inputData.address, number: undefined };
        setInputData({...inputData, address: newAddress});
      }
    } else if (name === "data-input-complement") {
      const value: string = event.target.value;
      const newAddress: IAddressInput = { ...inputData.address, complement: value };
      setInputData({...inputData, address: newAddress});
    }

  };
  
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name: string = event.target.name;
    if (name === 'data-input-uf') {
      const value: unknown = event.target.value;
      if (value !== 'undefined' && value !== undefined) {
        const value: number = Number(event.target.value);
        const newAddress: IAddressInput = { ...inputData.address, ufId: value };
        setInputData({...inputData, address: newAddress});
      } else {
        const newAddress: IAddressInput = { ...inputData.address, ufId: undefined };
        setInputData({...inputData, address: newAddress});
      }
    }    
  };

  useEffect(() => {
    get('/api/uf').then((res: TMockResponseData) => {
      const data = res as IUf[];
      const newUfOptions: ISelectItem[] = data.map((item: IUf) => ({label: item.label, value: `${item.id}`}));
      setUfOptions(newUfOptions);
    }).catch((err: Error) => {
      console.error('Error on loading data:', err.message);
    })
  }, []);

  useEffect(() => {
    const validateInputData = (inputData: IAddressInput): void => {
      const isInputAddressZipCodeValid = Util.isDefined(inputData.zipCode) && inputData.zipCode?.length === 8;
      const isInputAddressValid = Util.stringHasValue(inputData.address)
      const isInputAddressUfValid = Util.isDefined(inputData.ufId)
      const isInputAddressCityValid = Util.stringHasValue(inputData.city)
      const isInputAddressDistrictValid = Util.stringHasValue(inputData.district)
      const isInputAddressNumberValid = Util.isDefined(inputData.number) && inputData.number! >= 0 && Util.isInteger(inputData.number!)
  
  
      const result = isInputAddressZipCodeValid && isInputAddressValid && isInputAddressUfValid && isInputAddressCityValid &&
        isInputAddressDistrictValid && isInputAddressNumberValid
      
      setIsInputValid(result)
    }

    validateInputData(inputData.address ?? {})
  }, [inputData.address, setIsInputValid]);

  return (
    <>
      <div style={{display: 'flex', gap: '15px', marginTop: '30px', marginBottom: '30px'}}>
        <div style={{flexGrow: '1'}}>
          <InputMasked field="data-input-zip-code" label={"CEP"} isRequired={true}
            inputMask={"99.999-999"} placeholder="00.000-000"
            value={inputData.address?.zipCodeInput ?? ''} onChange={onChangeInput}
          />
        </div>
        <div style={{flexGrow: '1'}}>
          <InputText field="data-input-address" label="Endereço" isRequired={true}
            placeholder="Informe o endereço..." value={inputData.address?.address ?? ''} onChange={onChangeInput}
          />
        </div>
      </div>
      
      <div style={{display: 'flex', gap: '15px', marginBottom: '30px'}}>
        <div style={{flexGrow: '1'}}>
          <InputSelect field="data-input-uf" label="Estado" isRequired={true}
            placeholder="UF..." options={ufOptions}
            data-selected-placeholder={inputData.address?.ufId === undefined || inputData.address?.ufId === null}
            value={inputData.address?.ufId} onChange={onChangeSelect}
          />
        </div>
        <div style={{flexGrow: '8'}}>
          <InputText field="data-input-city" label="Cidade" isRequired={true}
            placeholder="Informe a cidade..." value={inputData.address?.city ?? ''} onChange={onChangeInput}
          />
        </div>
      </div>
      
      <div style={{display: 'flex', gap: '15px', marginBottom: '30px'}}>
        <div style={{flexGrow: '1'}}>
          <InputText field="data-input-district" label="Bairro" isRequired={true}
            placeholder="Informe o bairro..." value={inputData.address?.district ?? ''} onChange={onChangeInput}
          />
        </div>
        <div style={{flexGrow: '1'}}>
          <InputNumber field="data-input-number" label="Número" isRequired={true}
            placeholder="Informe o número..." value={inputData.address?.number ?? ''} onChange={onChangeInput}
          />
        </div>
      </div>
      
      <div>
        <InputText field="data-input-complement" label="Complemento"
          placeholder="Informe o complemento..." value={inputData.address?.complement ?? ''} onChange={onChangeInput}
        />
      </div>
    </>
  );
};

export default FormStageAddress;
