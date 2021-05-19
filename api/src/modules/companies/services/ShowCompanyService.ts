import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Company from '../infra/typeorm/entities/Company';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

@injectable()
class ShowCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute(id: string): Promise<Company | undefined> {
    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new AppError('Company not found.');
    }

    return company;
  }
}

export default ShowCompanyService;
