/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import styles from "./InputFile.module.css"
import { IFile } from "../../../services/Interfaces";
import { Util } from "../../../services/Util";

interface InputFileProps {
  maxFileCount: number;
  maxFileSizeBytes: number;
  onFilesChange?: (files: IFile[]) => void;
}

const InputFile: React.FC<InputFileProps> = ({maxFileCount, maxFileSizeBytes, onFilesChange}) => {
  const [isDraggingOnZone, setIsDraggingOnZone] = useState<boolean>(false)
  const [files, setFiles] = useState<IFile[]>([])
  const dragCounter = useRef<number>(0);
  const fileIdRef = useRef<number>(0);

  const onDragEnterLabel = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current++;
    setIsDraggingOnZone(true);
  }

  const onDragLeaveLabel = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDraggingOnZone(false);
    }
  }

  const onDragOverLabel = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  }
  
  const onDropLabel = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current = 0;
    setIsDraggingOnZone(false);
    if (event.dataTransfer.items && event.dataTransfer.items.length) {
      const processFiles = [...event.dataTransfer.items]
        .map((item: DataTransferItem) => item.getAsFile())
        .filter((item: File | null) => item !== null )

      processFileList(processFiles)
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const processFiles: File[] = [...event.target.files]
      processFileList(processFiles)
    }
  }

  const onClickButton = (event: React.MouseEvent<HTMLButtonElement>, id: number): void => {
    event.preventDefault();
    event.stopPropagation();
    const newFiles = [...files]
    const idx = newFiles.findIndex((item: IFile) => item.id === id);
    if (idx >= 0) {
      newFiles.splice(idx, 1)
      setFiles(newFiles)
    }
  }

  const processFileList = (fileList: File[]): void => {
    const newFiles: IFile[] = [...files];

    fileList.forEach((item: File) => {
      if (newFiles.length < maxFileCount && item.size <= maxFileSizeBytes) {
        const size = Util.formatStrBytes(item.size);
        const formattedSize = `${size.amount.toFixed(2).replace('.', ',')} ${size.unit}`
        const newFile: IFile = {
          id: fileIdRef.current++,
          name: item.name,
          sizeFormat: formattedSize,
        }
        newFiles.push(newFile)
      }
    })
    setFiles(newFiles)
  }

  useEffect(() => {
    if (onFilesChange) {
      onFilesChange(files);
    }
  }, [files]);

  return (
    <label
      className={`${styles['dragbox']} ${isDraggingOnZone ? styles['dragging'] : ''}`}
      onDragEnter={onDragEnterLabel}
      onDragLeave={onDragLeaveLabel}
      onDragOver={onDragOverLabel}
      onDrop={onDropLabel}
    >
      <input className={styles['input']} type="file" multiple onChange={onChangeInput} />
      <div className={`${styles['file-grid']} ${ files.length ? styles['file-grid-not-empty'] : styles['file-grid-empty'] }`}>
        { !files.length ?
          <p className="btn-link">Arraste ou selecione um arquivo (4MB por arquivo)</p>
          :
          <>
            {files.map((item: IFile, i: number) => {
              return (
                <div key={i} className={styles['wrapper']}>
                  <div className={styles['item']}>
                    <span className={styles['size']}>{item.sizeFormat}</span>
                    <span className={styles['name']}>{item.name}</span>
                  </div>
                  <button className={styles['btn-remove']} type="button"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClickButton(event, item.id)}>Remover anexo</button>
                </div>
              )
            })}
          </>
        }
      </div>
      <div>
        <p className={styles['file-legend']}>{files.length}/{maxFileCount} arquivos anexados</p>
      </div>
    </label>
  )
}

export default InputFile;