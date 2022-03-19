export default interface ICreateCompanyDTO {
  code: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  email?: string;
  tel?: string;
  endereco?: string;
  cep?: string;
  uf?: string;
  info?: string;
  matriz_id?: string;
  isMatriz: boolean;
  segment_id: string;
  company_logo: string;
  company_color: string;
}
