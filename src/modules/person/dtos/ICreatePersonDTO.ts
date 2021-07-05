export default interface ICreatePersonDTO {
  code: string;
  cpf?: string;
  cnpj?: string;
  nome?: string;
  razao_social?: string;
  nome_fantasia?: string;
  email?: string;
  tel?: string;
  endereco?: string;
  cep?: string;
  uf?: string;
  info?: string;
  isUser: boolean;
  tipo?: string;
}
