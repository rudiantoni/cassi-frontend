import { IProviderType, ISpecialty, IType, IUf } from "./Interfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TAllowedAny = any;

export type TMockResponseData = IProviderType[] | ISpecialty[] | IType[] | IUf[]

export type TMockResponse = {
  route: string;
  data: TMockResponseData;
};

export type TValidDataInputType = "cpf" | "cnpj";