import { getRepository, Repository } from 'typeorm';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';

import Company from '../entities/Company';

class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  public async create({
    name,
    cnpj,
    demand,
    annual_billing,
    about,
  }: ICreateCompanyDTO): Promise<Company> {
    const company = this.ormRepository.create({
      name,
      cnpj,
      demand,
      annual_billing,
      about,
    });

    await this.ormRepository.save(company);

    return company;
  }

  public async save(company: Company): Promise<Company> {
    return this.ormRepository.save(company);
  }

  public async findAllCompanies(): Promise<Company[]> {
    const companies = await this.ormRepository.find();

    return companies;
  }

  public async findById(id: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne(id);

    return company;
  }

  public async findByName(name: string): Promise<Company[] | undefined> {
    const company = await this.ormRepository.find({
      // where: { name: ILIKE (`%${name}%`) },
      where: `"name" ILIKE '${name}%'`,
    });

    return company;
  }

  public async delete(id: string): Promise<number | null | undefined> {
    const { affected } = await this.ormRepository.delete({ id });

    return affected;
  }
}

export default CompaniesRepository;
