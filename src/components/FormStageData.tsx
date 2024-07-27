import { useEffect, useState } from "react";
import { get } from "../services/Api";
import { Consts } from "../services/Consts";
import { IDataInput, IProvider, IProviderType, ISelectItem, ISpecialty } from "../services/Interfaces";
import { TMockResponseData, TValidDataInputType } from "../services/Types";
import { Util } from "../services/Util";
import InputMasked from "./Input/InputMasked/InputMasked";
import InputMultiSelect from "./Input/InputMultiSelect/InputMultiSelect";
import InputRadio from "./Input/InputRadio/InputRadio";
import InputSelect from "./Input/InputSelect/InputSelect";
import InputText from "./Input/InputText/InputText";

interface FormStageDataProps {
  setIsInputValid: React.Dispatch<React.SetStateAction<boolean>>;
  inputData: IProvider;
  setInputData: React.Dispatch<React.SetStateAction<IProvider>>;
  selectedSpecialties: ISelectItem[];
  setSelectedSpecialties: React.Dispatch<React.SetStateAction<ISelectItem[]>>;
}

const FormStageData: React.FC<FormStageDataProps> = ({ setIsInputValid, inputData, setInputData, selectedSpecialties, setSelectedSpecialties }) => {
  const [isCpf, setIsCpf] = useState<boolean>(true);
  const [providerTypeOptions, setProviderTypeOptions] = useState<ISelectItem[]>([]);
  const [specialtyOptions, setSpecialtyOptions] = useState<ISelectItem[]>([]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name;

    if (name === "data-input-type") {
      const value: TValidDataInputType = event.target.value as TValidDataInputType;
      const newData: IDataInput = { ...inputData.data, type: value, documentInput: undefined, document: undefined };
      setInputData({...inputData, data: newData});
    } else if (name === "data-input-name") {
      const value: string = event.target.value;
      const newData: IDataInput = { ...inputData.data, name: value };
      setInputData({...inputData, data: newData});
    } else if (name === "data-input-document") {
      const value: string = event.target.value;
      const documentNumbersOnly: string = Util.extractNumbers(value);
      const newData: IDataInput = { ...inputData.data, documentInput: value, document: documentNumbersOnly };
      setInputData({...inputData, data: newData});
    }
  };

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name: string = event.target.name;
    if (name === 'data-input-provider-type') {
      const value: unknown = event.target.value;
      if (value !== 'undefined' && value !== undefined) {
        const value: number = Number(event.target.value);
        const newData: IDataInput = { ...inputData.data, providerTypeId: value };
        setInputData({...inputData, data: newData});
      } else {
        const newData: IDataInput = { ...inputData.data, providerTypeId: undefined };
        setInputData({...inputData, data: newData});
      }
    }    
  };

  const onChangeMultiSelect = (value: ISelectItem[]) => {
    const dataValue: number[] = value.map((item: ISelectItem) => Number(item.value)).sort();
    const newData: IDataInput = { ...inputData.data, specialtyIds: dataValue };
    setInputData({...inputData, data: newData});
    setSelectedSpecialties(value);
  }
  
  const isDocumentValid = (doc?: string, type?: string): boolean => {
    if (!doc || !type) {
      return false;
    }
    if (type === 'cpf') {
      return doc.length == 11
    } else if (type === 'cnpj') {
      return doc.length == 14
    }
    return false;
  }

  useEffect(() => {
    get('/api/provider/types').then((res: TMockResponseData) => {
      const data = res as IProviderType[];
      const newProviderOptions: ISelectItem[] = data.map((item: IProviderType) => ({label: item.label, value: `${item.id}`}));
      setProviderTypeOptions(newProviderOptions);
    }).catch((err: Error) => {
      console.error('Error on loading data:', err.message);
    })

    get('/api/specialty').then((res: TMockResponseData) => {
      const data = res as ISpecialty[];
      const newSpecialtyOptions: ISelectItem[] = data.map((item: ISpecialty) => ({label: item.label, value: `${item.id}`}));
      setSpecialtyOptions(newSpecialtyOptions);
    }).catch((err: Error) => {
      console.error('Error on loading data:', err.message);
    })
  }, []);

  useEffect(() => {
    setIsCpf(!(inputData.data?.type === "cnpj"));
  }, [inputData.data?.type]);

  useEffect(() => {
    const validateInputData = (inputData: IDataInput): void => {
      const isInputDataTypeValid = inputData.type === 'cnpj' || inputData.type === 'cpf';
      const isInputDataNameValid = Util.stringHasValue(inputData.name);
      const isInputDataDocumentValid = isDocumentValid(inputData.document, inputData.type)
      const isInputDataProviderTypeValid = Util.isDefined(inputData.providerTypeId)
      const isInputDataSpecialtiesValid = Util.isDefined(inputData.specialtyIds) && !!inputData.specialtyIds?.length
      const result = isInputDataTypeValid && isInputDataNameValid && isInputDataDocumentValid && isInputDataProviderTypeValid && isInputDataSpecialtiesValid
      setIsInputValid(result)
    }

    if (inputData.data) {
      validateInputData(inputData.data)
    }
  }, [inputData.data, setIsInputValid]);

  return (
    <>
      <div style={{ marginTop: '30px' }}>
        <InputRadio field="data-input-type" label="Tipo" isRequired={true}
          options={Consts.TYPES} value={inputData.data?.type ?? ''} onChange={onChangeInput}
        />
      </div>
      
      <div style={{display: 'flex', gap: '15px', marginBottom: '30px'}}>
        <div style={{flexGrow: '1'}}>
          <InputText field="data-input-name" label="Nome" isRequired={true}
            placeholder="Informe o nome..." value={inputData.data?.name ?? ''} onChange={onChangeInput}
          />
        </div>
        <div style={{flexGrow: '1'}}>
          <InputMasked field="data-input-document" label={isCpf ? "CPF" : "CNPJ"} isRequired={true}
            inputMask={isCpf ? '999.999.999-99' : '99.999.999/9999-99'}
            placeholder={isCpf ? '000.000.000-00' : '00.000.000/0000-00'}
            value={inputData.data?.documentInput ?? ''} onChange={onChangeInput}
          />
        </div>
      </div>
      
      <div style={{marginBottom: '30px'}}>
        <InputSelect field="data-input-provider-type" label="Tipo do prestador" isRequired={true}
          placeholder="Selecione uma opção" options={providerTypeOptions}
          data-selected-placeholder={inputData.data?.providerTypeId === undefined || inputData.data?.providerTypeId === null}
          value={inputData.data?.providerTypeId} onChange={onChangeSelect}
        />
      </div>
      
      <div>
        <InputMultiSelect label="Especialidade" isRequired={true} placeholder="Selecione uma opção"
          options={specialtyOptions} selectedOptions={selectedSpecialties} onChange={onChangeMultiSelect}
        />
      </div>

    </>
  );
};

export default FormStageData;
