import { FormEvent, useEffect, useState } from 'react';

import { Modal, ModalProps } from 'antd';

import { useCompanies } from '../../hooks/useCompanies';
import { useModal } from '../../hooks/useModal';

import InputMask from 'react-input-mask';

import { Form } from './styles';

interface CompanyModalProps extends ModalProps {
  title: 'Cadastrar' | 'Alterar' | 'Visualizar';
}

export function CompanyModal( { title, visible, onOk, onCancel }: CompanyModalProps) {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [demand, setDemand] = useState('');
  const [annual_billing, setAnnualBilling] = useState('');
  const [about, setAbout] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const { handleOk } = useModal();

  const { currentCompany, createCompany, updateCompany } = useCompanies();

  useEffect(() => {
    console.log('useEffect')
    clearInputs();

    if (currentCompany) {
      const { name, cnpj, demand, annual_billing, about } = currentCompany;

      setName(name);
      setCnpj(cnpj);
      setDemand(demand);
      setAnnualBilling(annual_billing);
      setAbout(about);

      if (title === 'Visualizar') {
        setIsDisabled(true);
      }
    }

  }, [currentCompany, title]);

  function clearInputs() {
    setName('');
    setCnpj('');
    setDemand('');
    setAnnualBilling('');
    setAbout('');
    setIsDisabled(false);
  }

  async function handleCreateCompany(event: FormEvent) {
    event.preventDefault();

    const company = {
      name,
      cnpj,
      demand,
      annual_billing,
      about
    };

    await createCompany(company);

    handleOk();
    clearInputs();

    showSuccessMessage('Empresa cadastrada com sucesso!');
  }

  function showSuccessMessage(message: string) {
    Modal.success({
      content: message,
      closable: true,
      okButtonProps: { hidden: true }
    });
  }

  async function handleUpdateCompany(event: FormEvent) {
    event.preventDefault();

    if (currentCompany) {
      const { id } = currentCompany;

      const newCompany = {
        id,
        name,
        cnpj,
        demand,
        annual_billing,
        about
      };

      await updateCompany(newCompany);

      handleOk();
      clearInputs();

      showSuccessMessage('Empresa alterada com sucesso!');
    }
  }

  return (
    <Modal
      title={`${title} Empresa`}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      footer={null}
    >
      <Form onSubmit={currentCompany ? handleUpdateCompany : handleCreateCompany}>
        <input
          placeholder="Nome"
          value={name}
          required
          onChange={event => setName(event.target.value)}
          disabled={isDisabled}
        />

        <InputMask
          mask="99.999.999/9999-99"
          placeholder="CNPJ"
          value={cnpj}
          required
          disabled={isDisabled}
          onChange={event => setCnpj(event.target.value)}
        />

        <InputMask
          mask="R$ 99.999.999,99"
          placeholder="Demanda"
          value={demand}
          disabled={isDisabled}
          required
          onChange={event => setDemand(event.target.value)}
        />

        <select
          defaultValue={annual_billing}
          disabled={isDisabled}
          required
          onChange={event => setAnnualBilling(event.target.value)}
        >
          <option>Até R$ 10 milhões</option>
          <option>De R$ 10 a R$ 50 milhões</option>
          <option>De R$ 50 a R$ 200 milhões</option>
          <option>De R$ 200 a R$ 500 milhões</option>
          <option>Acima de R$ 500 milhões</option>
        </select>

        <textarea
          placeholder="Sobre"
          value={about}
          disabled={isDisabled}
          required
          onChange={event => setAbout(event.target.value)}
        />

        {title && title !== 'Visualizar' && (
          <button type="submit">{title}</button>
        )}
      </Form>
    </Modal>
  );
}
