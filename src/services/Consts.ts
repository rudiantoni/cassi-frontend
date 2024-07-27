import { ISelectItem } from "./Interfaces";

export class Consts {
  static SUPRESS_THIRD_PARTY_ERRORS: boolean = true;
  static SIMULATE_API_CALL_MS: number = 1000;
  static SIMULATE_LOADING_MS: number = 1000;
  static MAX_FILE_SIZE_BYTES: number = 4 * 1024 * 1024 // 4 means 4 MB
  static MAX_ATTACHMENTS: number = 3
  static MAX_LENGTH_NOTE: number = 800
  static TYPES: ISelectItem[] = [
    { value: "cpf", label: "Pessoa Física" },
    { value: "cnpj", label: "Pessoa Jurídica" },
  ];
}
