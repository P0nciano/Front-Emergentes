import type { OculosType } from "./OculosType"

export type VendaType = {
  id: number;
  clienteId: string;
  carroId: number;
  oculos: OculosType;
  descricao: string;
  resposta: string | null;
  createdAt: string;
  updatedAt: string | null;
};