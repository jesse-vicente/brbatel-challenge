import { useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';

import { Container } from './styles';

import { useCompanies } from '../../hooks/useCompanies';

import { api } from '../../services/api';

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const { setCompanies } = useCompanies();

  async function handleSearchCompany(name: string) {

    setSearchTerm(name);

    const response = await api.get(`companies/?name=${name}`);

    const companiesList = response.data;

    setCompanies(companiesList);

    console.log(companiesList);
  }

  return (
    <Container >
      <input
        placeholder="Buscar"
        value={searchTerm}
        onChange={e => handleSearchCompany(e.target.value)}
      />
      <SearchOutlined />
    </Container>
  );
}
