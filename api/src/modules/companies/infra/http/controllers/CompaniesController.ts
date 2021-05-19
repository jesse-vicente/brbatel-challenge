import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListCompaniesService from '@modules/companies/services/ListCompaniesService';
import CreateCompanyService from '@modules/companies/services/CreateCompanyService';
import UpdateCompanyService from '@modules/companies/services/UpdateCompanyService';
import ShowCompanyService from '@modules/companies/services/ShowCompanyService';
import FindCompanyService from '@modules/companies/services/FindCompanyService';
import DeleteCompanyService from '@modules/companies/services/DeleteCompanyService';

export default class CompaniesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    if (name) {
      const findCompany = container.resolve(FindCompanyService);

      const company = await findCompany.execute(String(name));

      return response.json(company);
    }

    const listCompanies = container.resolve(ListCompaniesService);

    const companies = await listCompanies.execute();

    return response.json(companies);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cnpj, demand, annual_billing, about } = request.body;

    const createCompany = container.resolve(CreateCompanyService);

    const company = await createCompany.execute({
      name,
      cnpj,
      demand,
      annual_billing,
      about,
    });

    return response.json(company);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, cnpj, demand, annual_billing, about } = request.body;

    const updateCompany = container.resolve(UpdateCompanyService);

    const company = await updateCompany.execute({
      id,
      name,
      cnpj,
      demand,
      annual_billing,
      about,
    });

    return response.json(company);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCompany = container.resolve(ShowCompanyService);

    const company = await showCompany.execute(id);

    return response.json(company);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCompany = container.resolve(DeleteCompanyService);

    const affected = await deleteCompany.execute(id);

    return response.json(affected);
  }
}
