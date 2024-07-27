import { TMockResponse } from "./Types";

const MOCK_DATA: Record<string, TMockResponse> = {
  PROVIDER_TYPES: {
    route: "/api/provider/types",
    data: [
      { id: 0, name: "MEDIC", label: "Médico(a)" },
      { id: 1, name: "PHYSIOTHERAPIST", label: "Fisioterapeuta" },
      { id: 2, name: "NUTRITIONIST", label: "Nutricionista" },
      { id: 3, name: "PSYCHOLOGIST", label: "Psicólogo(a)" },
      { id: 4, name: "OCCUPATIONAL_THERAPY", label: "Terapia Ocupacional" },
      { id: 5, name: "OTHERS", label: "Outros" },
    ],
  },
  SPECIALTIES: {
    route: "/api/specialty",
    data: [
      { id: 0, name: "ACUPUNCTURE", label: "Acupuntura" },
      { id: 1, name: "ALLERGY_AND_IMMUNOLOGY", label: "Alergia e Imunologia" },
      { id: 2, name: "ANESTHESIOLOGY", label: "Anestesiologia" },
      { id: 3, name: "DEVICES_AND_OBJECTS", label: "Aparelhos e Objetos" },
      { id: 4, name: "ASSISTANCE_TO_PEOPLE", label: "Assistência a Pessoas" },
      { id: 5, name: "CARDIOLOGY", label: "Cardiologia" },
      { id: 6, name: "CARDIOVASCULAR_SURGERY", label: "Cirurgia Cardiovascular" },
      { id: 7, name: "HAND_SURGERY", label: "Cirurgia da Mão" },
      { id: 8, name: "HEAD_SURGERY", label: "Cirurgia de Cabeça" },
      { id: 9, name: "DEVICE_SURGERY", label: "Cirurgia do Aparelho" },
      { id: 10, name: "GENERAL_SURGERY", label: "Cirurgia Geral" },
      { id: 11, name: "PEDIATRIC_SURGERY", label: "Cirurgia Pediátrica" },
    ],
  },
  UF: {
    route: '/api/uf',
    data: [
      {id: 0, label: "AC", name: "ACRE"},
      {id: 1, label: "AL", name: "ALAGOAS"},
      {id: 2, label: "AM", name: "AMAZONAS"},
      {id: 3, label: "AP", name: "AMAPA"},
      {id: 4, label: "BA", name: "BAHIA"},
      {id: 5, label: "CE", name: "CEARA"},
      {id: 6, label: "DF", name: "DISTRITO_FEDERAL"},
      {id: 7, label: "ES", name: "ESPIRITO_SANTO"},
      {id: 8, label: "GO", name: "GOIAS"},
      {id: 9, label: "MA", name: "MARANHAO"},
      {id: 10, label: "MG", name: "MINAS_GERAIS"},
      {id: 11, label: "MS", name: "MATO_GROSSO_DO_SUL"},
      {id: 12, label: "MT", name: "MATO_GROSSO"},
      {id: 13, label: "PA", name: "PARA"},
      {id: 14, label: "PB", name: "PARAIBA"},
      {id: 15, label: "PE", name: "PERNAMBUCO"},
      {id: 16, label: "PI", name: "PIAUI"},
      {id: 17, label: "PR", name: "PARANA"},
      {id: 18, label: "RJ", name: "RIO_DE_JANEIRO"},
      {id: 19, label: "RN", name: "RIO_GRANDE_DO_NORTE"},
      {id: 20, label: "RO", name: "RONDONIA"},
      {id: 21, label: "RR", name: "RORAIMA"},
      {id: 22, label: "RS", name: "RIO_GRANDE_DO_SUL"},
      {id: 23, label: "SC", name: "SANTA_CATARINA"},
      {id: 24, label: "SE", name: "SERGIPE"},
      {id: 25, label: "SP", name: "SAO_PAULO"},
      {id: 26, label: "TO", name: "TOCANTINS"}
    ]
  }
};

export { MOCK_DATA };

