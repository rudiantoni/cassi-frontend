import { useState } from "react";
import FormStageAddress from "../../components/FormStageAddress";
import FormStageAttachment from "../../components/FormStageAttachment";
import FormStageConfirmation from "../../components/FormStageConfirmation";
import FormStageContact from "../../components/FormStageContact";
import FormStageData from "../../components/FormStageData";
import Stepper, { StepItem } from "../../components/Stepper/Stepper";
import { IProvider, ISelectItem } from "../../services/Interfaces";
import stylesRp from "./RegisterProvider.module.css";
import stylesL from "./RegisterProviderLeft.module.css";
import stylesR from "./RegisterProviderRight.module.css";

const RegisterProvider = (): JSX.Element => {
  const path: string =
    "Credenciado CASSI > Quero ser um credenciado > Nova solicitação";

  const defaultSteps: StepItem[] = [
    { label: "1", active: true, description: "Dados" },
    { label: "2", active: false, description: "Endereço" },
    { label: "3", active: false, description: "Contato" },
    { label: "4", active: false, description: "Confirmação" },
    { label: "5", active: false, description: "Anexos" },
  ];
  const defaultCurrentStepIndex: number = 0
  const defaultIsInputValid: boolean = false
  const defaultIsFinished: boolean = false
  const defaultInputData: IProvider = {data: {type: 'cpf'}}
  const defaultSelectedSpecialties: ISelectItem[] = []

  const [steps, setSteps] = useState<StepItem[]>(defaultSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(defaultCurrentStepIndex);
  const [isInputValid, setIsInputValid] = useState<boolean>(defaultIsInputValid);
  const [isFinished, setIsFinished] = useState<boolean>(defaultIsFinished);
  const [inputData, setInputData] = useState<IProvider>(defaultInputData);
  const [selectedSpecialties, setSelectedSpecialties] = useState<ISelectItem[]>(defaultSelectedSpecialties);

  const onClickButton = (method: "previous" | "next" | 'finish') => {
    if (method === "previous") {
      if (canRegress()) {
        const newSteps = [...steps];
        const newIndex = currentStepIndex - 1;
        const oldIndex = newIndex + 1;
        newSteps[oldIndex].active = false;
        newSteps[newIndex].active = true;
        setSteps(newSteps);
        setCurrentStepIndex(newIndex);
      }
    } else if (method === "next") {
      if (canProgress()) {
        const newSteps = [...steps];
        const newIndex = currentStepIndex + 1;
        const oldIndex = newIndex - 1;
        newSteps[oldIndex].active = false;
        newSteps[newIndex].active = true;
        setSteps(newSteps);
        setCurrentStepIndex(newIndex);
      }
    } else if (method === "finish") {
      console.log('Dados enviados:', inputData)
      setIsFinished(true)
    }
  };

  const onClickButtonNewRequest = () => {
    setSteps(defaultSteps)
    setCurrentStepIndex(defaultCurrentStepIndex)
    setIsInputValid(defaultIsInputValid)
    setIsFinished(defaultIsFinished)
    setInputData(defaultInputData)
    setSelectedSpecialties(defaultSelectedSpecialties)
  }

  const canProgress = (): boolean => {
    if (currentStepIndex === steps.length - 1) {
      return isInputValid;
    } else {
      return currentStepIndex < steps.length - 1;
    }
  };

  const canRegress = (): boolean => {
    return currentStepIndex > 0;
  };

  return (
    <div className={stylesRp['register-provider-container']}>
      <div className={stylesL['provider-left']}>
        <div className={stylesL['image-container']}>
          <p className={stylesL['path']}>{path}</p>
          <img src="/src/assets/figure.png" />
          <h1>Seja um novo prestador CASSI</h1>
          <p>
            Para se credenciar à CASSI o primeiro passo é registrar a sua
            proposta, que será avaliada de acordo com a necessidade de oferta
            dos serviços na localidade.
          </p>
        </div>
      </div>
      <div className={stylesR['provider-right']}>
        <div className={stylesR['form-container']}>

          { isFinished ?
            <div className={stylesR['form-finished']}>
              <h1>Finalizado!</h1>
              <p className={stylesR['finished-details']}>Protocolo: 231321542132</p>
              <p className={stylesR['finished-info']}>Sua solicitação foi enviada com sucesso</p>
              <button className="btn" type="button" onClick={() => onClickButtonNewRequest()}>Nova solicitação</button>
            </div>
            :
            <div className={stylesR['form-panel']}>
              <div>
                <Stepper steps={steps} />
              </div>

              <div className={stylesR['form']}>
                {currentStepIndex === 0 &&
                  <FormStageData
                    setIsInputValid={setIsInputValid}
                    inputData={inputData}
                    setInputData={setInputData}
                    selectedSpecialties={selectedSpecialties}
                    setSelectedSpecialties={setSelectedSpecialties}
                  />
                }
                {currentStepIndex === 1 &&
                  <FormStageAddress
                    setIsInputValid={setIsInputValid}
                    inputData={inputData}
                    setInputData={setInputData}
                  />
                }
                {currentStepIndex === 2 &&
                  <FormStageContact
                    setIsInputValid={setIsInputValid}
                    inputData={inputData}
                    setInputData={setInputData}
                  />
                }
                {currentStepIndex === 3 &&
                  <FormStageConfirmation setIsInputValid={setIsInputValid} />
                }
                {currentStepIndex === 4 &&
                  <FormStageAttachment
                    setIsInputValid={setIsInputValid}
                    inputData={inputData}
                    setInputData={setInputData}
                  />
                }
              </div>

              <div className={stylesR['action-buttons']}>
                <button className="btn" id="button-previous" name="button-previous" type="button"
                  disabled={!canRegress()} onClick={() => onClickButton("previous")}>
                    Anterior
                </button>
                <br />
                <button className="btn" id="button-next" name="button-next" type="button"
                  disabled={!canProgress() || !isInputValid} onClick={() => {
                    if (currentStepIndex === steps.length - 1) {
                      onClickButton("finish")
                    } else {
                      onClickButton("next")
                    }
                  }}>
                  {currentStepIndex === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );

};

export default RegisterProvider;
