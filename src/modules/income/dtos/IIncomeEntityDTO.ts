export interface IIncomeEntityDTO {
  id: string;
  code: string;
  account: string;
  type: string;
}

export type ICreateIncomeEntityDTO = Omit<IIncomeEntityDTO, 'id'>;
