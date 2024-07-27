import { useEffect } from "react";
import QuestionMark from "../icons/QuestionMark";
import { Consts } from "../services/Consts";
import { IAttachmentInput, IFile, IProvider } from "../services/Interfaces";
import InputFile from "./Input/InputFile/InputFile";

interface FormStageAttachmentProps {
  setIsInputValid: React.Dispatch<React.SetStateAction<boolean>>;
  inputData: IProvider;
  setInputData: React.Dispatch<React.SetStateAction<IProvider>>;
}

const FormStageAttachment: React.FC<FormStageAttachmentProps> = ({ setIsInputValid, inputData, setInputData}) => {
  const onChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value: string = event.target.value;
    const newAttachment: IAttachmentInput = { ...inputData.attachment, note: value };
    setInputData({...inputData, attachment: newAttachment});
  };

  const onChangeInputFile = (files: IFile[]): void => {
    if (files.length) {
      const newAttachment: IAttachmentInput = { ...inputData.attachment, files: files };
      setInputData({...inputData, attachment: newAttachment});
    }
  };

  useEffect(() => {
    const validateInputData = (inputData: IAttachmentInput): void => {
      const isInputAttachmentNoteValid = (inputData.note?.length ?? 0) <= Consts.MAX_LENGTH_NOTE;
      const result = isInputAttachmentNoteValid
      setIsInputValid(result)
    }

    validateInputData(inputData.attachment ?? {})
  }, [inputData.attachment, setIsInputValid])

  return (
    <div className="h-100 flex-column">
      <div className="flex-column" style={{ flex: '1', paddingTop: '30px' }}>
        <div className="flex-between" style={{ marginBottom: '10px' }}>
          <p style={{ fontWeight: 'bold', fontSize: '15px' }}>Anexar arquivos</p>
          <p className="flex-center">
            <QuestionMark className="link" style={{width: '15px', height: 'auto'}} />
            <a className="link" href="#" style={{marginLeft: '10px'}}>Documentação necessária</a>
          </p>
        </div>
        <div style={{flex: '1'}}>
          <InputFile
            maxFileCount={Consts.MAX_ATTACHMENTS}
            maxFileSizeBytes={Consts.MAX_FILE_SIZE_BYTES}
            onFilesChange={onChangeInputFile}
          />
        </div>
      </div>
      <div className="flex-column" style={{ flex: '1', paddingTop: '30px', paddingBottom: '30px'}}>
        <p style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '10px' }}>Observações</p>
        <div className="flex-column" style={{flex: 1, border: '1px solid var(--light-grey)', borderRadius: '5px'}}>
          <textarea
            className="textarea"
            value={inputData.attachment?.note ?? ''}
            onChange={onChangeTextarea}
            maxLength={Consts.MAX_LENGTH_NOTE}>
              {inputData.attachment?.note ?? ''}
          </textarea>
          <div className="w-100 flex-end" style={{flex: '0 0 auto' }}>
            <p style={{color: 'var(--dark-grey)', fontSize: '12px', padding: '10px'}}>
              {inputData.attachment?.note?.length ?? 0}/{Consts.MAX_LENGTH_NOTE} caracteres
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormStageAttachment;
