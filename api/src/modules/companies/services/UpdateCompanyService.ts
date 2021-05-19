import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Company from '../infra/typeorm/entities/Company';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

import IUpdateCompanyDTO from '../dtos/IUpdateCompanyDTO';

@injectable()
class UpdateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({
    id,
    name,
    cnpj,
    demand,
    annual_billing,
    about,
  }: IUpdateCompanyDTO): Promise<Company | undefined> {
    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new AppError('Company not found.');
    }

    Object.assign(company, {
      name,
      cnpj,
      demand,
      annual_billing,
      about,
    });

    return this.companiesRepository.save(company);
  }
}

export default UpdateCompanyService;
