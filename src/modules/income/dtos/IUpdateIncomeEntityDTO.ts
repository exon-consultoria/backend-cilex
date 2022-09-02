export default interface ICreateIncomeEntityDTO {
  id: string;
  date_income: string;
  type: string;
  financial_entity: string;
  chart_of_accounts: string;
  description: string;
  value: string;
  date_to_pay: string;
  value_payed: string;
  date_payed: string;
  title_status: string;
  payed_status: string;
  cash_flow: string;
}
