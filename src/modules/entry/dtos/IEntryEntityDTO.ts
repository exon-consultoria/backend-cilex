export interface IEntryEntityDTO {
  id: string;
  date_income: string;
  type: string;
  financial_entity: string;
  description: string;
  value: number;
  date_to_pay: string;
  value_payed: number;
  date_payed: string;
  title_status: string;
  payed_status: string;
  cash_flow: number;
  income_id?: string;
}

export type ICreateEntryEntityDTO = Omit<IEntryEntityDTO, 'id'>;
