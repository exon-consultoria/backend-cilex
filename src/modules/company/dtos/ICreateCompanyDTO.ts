export default interface ICreateCompanyDTO {
  cod: string;
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
}
