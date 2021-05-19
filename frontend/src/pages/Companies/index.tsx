import { useState } from 'react';

import { Modal, Card, List } from 'antd';

import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

import { useCompanies } from '../../hooks/useCompanies';
import { useModal } from '../../hooks/useModal';

import { CompanyModal } from '../../components/CompanyModal';

import { Container, Title, Button, CardContent } from './styles';


type Action = 'Cadastrar' | 'Alterar' | 'Visualizar';

export function Companies() {
  const [modalTitle, setModalTitle] = useState<Action>('Cadastrar');

  const { companies, setCurrentCompany, loadCompany, deleteCompany } = useCompanies();
  const { visible, handleOpen, handleOk, handleCancel } = useModal();

  async function handleOpenCompanyModal(action: Action, company_id?: string) {
    setModalTitle(action);

    if (company_id) {
      await handleLoadCompany(company_id);
    } else {
      setCurrentCompany(undefined);
    }

    handleOpen();
  }

  async function handleLoadCompany(id: string): Promise<void> {
    await loadCompany(id);
  }

  async function handleDeleteCompany(id: string): Promise<void> {
    await deleteCompany(id);

    handleOk();
    setCurrentCompany(undefined);

    showSuccessMessage('Empresa excluída com sucesso!');
  }

  function showSuccessMessage(message: string) {
    Modal.success({
      content: message,
      closable: true,
      okButtonProps: { hidden: true }
    });
  }

  const { confirm } = Modal;

  function showConfirm(id: string) {
    confirm({
      title: 'Você tem certeza?',
      icon: <ExclamationCircleOutlined />,
      content: 'Esta ação não poderá ser revertida!',
      cancelText: 'Cancelar',
      okText: 'Excluir',
      okButtonProps: {
        style: {
          background: '#c92929',
          borderColor: '#c92929',
          color: '#fff',
        }
      },
      onOk() {
        handleDeleteCompany(id);
        setCurrentCompany(undefined);
      },
      onCancel() {
        handleCancel();
        setCurrentCompany(undefined)
      },
    });
  }

  return (
    <Container>
      <header>
        <Title>Empresas</Title>
        <Button onClick={e => handleOpenCompanyModal('Cadastrar')}>
          + Cadastrar
        </Button>
      </header>

      <List
        grid={{
          gutter: 16,
          column: 3,
          xs: 1,
          sm: 1,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        pagination={{
          pageSize: 12
        }}
        dataSource={companies}
        renderItem={company => (
          <List.Item key={company.id}>
            <Card
              title={company.name}
              actions={[
                <EyeOutlined onClick={() => handleOpenCompanyModal('Visualizar', company.id)} />,
                <EditOutlined onClick={() => handleOpenCompanyModal('Alterar', company.id)} />,
                <DeleteOutlined onClick={() => showConfirm(company.id)} />,
              ]}
            >
              <CardContent>{company.about}</CardContent>
            </Card>
          </List.Item>
        )}
      />

      <CompanyModal
        title={modalTitle}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </Container>
  )
}
