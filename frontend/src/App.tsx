import 'antd/dist/antd.css';

import { GlobalStyle } from './styles/global';

import { Header } from './components/Header';

import { CompaniesProvider } from './hooks/useCompanies';
import { ModalProvider } from './hooks/useModal';

import { Companies } from './pages/Companies';

function App() {
  return (
    <CompaniesProvider>
      <ModalProvider>
        <Header />
        <GlobalStyle />
        <Companies />
      </ModalProvider>
    </CompaniesProvider>
  );
}

export default App;
