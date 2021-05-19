import { useState, useEffect, createContext, ReactNode, useContext } from 'react';

import { api } from '../services/api';

interface CompaniesProviderProps {
  children: ReactNode;
}

interface Company {
  id: string;
  name: string;
  cnpj: string;
  demand: string;
  annual_billing: string;
  about: string;
}

type CompanyInput = Omit<Company, 'id'>;

interface CompanyContextData {
  companies: Company[];
  currentCompany: Company | undefined;
  setCompanies: (company: Company[]) => void;
  setCurrentCompany: (company: Company | undefined) => void;
  createCompany: (companyInput: CompanyInput) => Promise<void>;
  updateCompany: (company: Company) => Promise<void>;
  loadCompany: (id: string) => Promise<void>;
  deleteCompany: (id: string) => Promise<number | null | undefined>;
}

const CompaniesContext = createContext<CompanyContextData>(
  {} as CompanyContextData
);

export function CompaniesProvider({ children }: CompaniesProviderProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentCompany, setCurrentCompany] = useState<Company | undefined>(undefined);

  useEffect(() => {
    api.get(`companies`).then((response) => {
      setCompanies(response.data);
    });
  }, []);

  async function createCompany(companyInput: CompanyInput) {
    try {
      const response = await api.post('/companies', companyInput);

      const newCompany = response.data;

      setCompanies([
        ...companies,
        newCompany,
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCompany(company: Company) {
    try {
      const { id } = company;

      const response = await api.put(`/companies/${id}`, company);

      const newCompany = response.data;

      const companyIndex = companies.findIndex(company => company.id === id);

      const companiesList = [...companies];

      companiesList[companyIndex] = newCompany;

      setCompanies(companiesList);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadCompany(id: string): Promise<void> {
    try {
      const response = await api.get(`/companies/${id}`);

      const company = response.data;

      setCurrentCompany(company);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCompany(id: string): Promise<number | null | undefined> {
    try {
      const response = await api.delete(`/companies/${id}`);

      setCompanies((companies) => companies.filter(
        (company) => company.id !== id
      ));

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CompaniesContext.Provider
      value={{
        companies,
        setCompanies,
        createCompany,
        updateCompany,
        currentCompany,
        setCurrentCompany,
        loadCompany,
        deleteCompany,
      }}>
      {children}
    </CompaniesContext.Provider>
  );
}

export function useCompanies() {
  const context = useContext(CompaniesContext);

  return context;
}
