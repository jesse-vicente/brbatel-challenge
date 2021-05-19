import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Company from '../infra/typeorm/entities/Company';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

@injectable()
class FindCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute(name: string): Promise<Company[] | undefined> {
    const companies = await this.companiesRepository.findByName(name);

    if (!companies) {
      throw new AppError('Company not found.');
    }

    return companies;
  }
}

export default FindCompanyService;
