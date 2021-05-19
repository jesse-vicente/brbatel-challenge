import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import Company from '../infra/typeorm/entities/Company';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({
    name,
    cnpj,
    demand,
    annual_billing,
    about,
  }: ICreateCompanyDTO): Promise<Company> {
    const company = await this.companiesRepository.create({
      name,
      cnpj,
      demand,
      annual_billing,
      about,
    });

    return company;
  }
}

export default CreateCompanyService;
