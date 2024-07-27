import { TValidDataInputType } from "./Types";

export interface ISelectItem {
  label: string;
  value: string;
}

export interface IProviderType {
  id: number;
  name: string;
  label: string;
}

export interface ISpecialty {
  id: number;
  name: string;
  label: string;
}

export interface IUf {
  id: number;
  name: string;
  label: string;
}

export interface IType {
  name: string;
  label: string;
}

export interface IFile {
  id: number;
  name: string;
  sizeFormat: string;
}

export interface IProvider {
  data?: IDataInput;
  address?: IAddressInput;
  contact?: IContactInput;
  attachment?: IAttachmentInput;
}

export interface IDataInput {
  type?: TValidDataInputType;
  name?: string;
  documentInput?: string;
  document?: string;
  providerTypeId?: number;
  specialtyIds?: number[];
}

export interface IAddressInput {
  zipCodeInput?: string;
  zipCode?: string;
  address?: string;
  ufId?: number;
  city?: string;
  district?: string;
  number?: number;
  complement?: string;
}

export interface IContactInput {
  name?: string;
  phoneMobile?: string;
  phoneMobileInput?: string;
  phoneResidential?: string;
  phoneResidentialInput?: string;
  mail?: string;
}

export interface IAttachmentInput {
  files?: IFile[];
  note?: string;
}