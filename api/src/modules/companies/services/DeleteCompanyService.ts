import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICompaniesRepository from '../repositories/ICompaniesRepository';

@injectable()
class DeleteCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute(id: string): Promise<number | null | undefined> {
    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new AppError('Company not found.');
    }

    const affected = await this.companiesRepository.delete(id);

    if (!affected) {
      throw new AppError('Company could not be deleted.');
    }

    return affected;
  }
}

export default DeleteCompanyService;
