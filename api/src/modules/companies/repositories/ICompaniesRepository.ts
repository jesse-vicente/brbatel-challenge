import Company from '../infra/typeorm/entities/Company';

import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';

export default interface ICompaniesRepository {
  create(data: ICreateCompanyDTO): Promise<Company>;

  save(company: Company): Promise<Company>;

  findAllCompanies(): Promise<Company[]>;

  findById(id: string): Promise<Company | undefined>;

  findByName(name: string): Promise<Company[] | undefined>;

  delete(id: string): Promise<number | null | undefined>;
}
