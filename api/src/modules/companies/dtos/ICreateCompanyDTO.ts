export default interface ICreateCompanyDTO {
  name: string;
  cnpj: string;
  demand: string;
  annual_billing: string;
  about?: string;
}
