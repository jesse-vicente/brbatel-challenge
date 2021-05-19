import { SearchBar } from '../SearchBar';
import { User } from '../User';

import { Container, Content, Logo } from './styles';

import logoImg from '../../assets/logo.png';

export function Header() {
  return (
    <Container>
      <Content>
        <a href="https://brbatel.com.br/" target="_blank" rel="noreferrer">
          <Logo src={logoImg} alt="BrBatel" />
        </a>

        <SearchBar />
        <User />
      </Content>
    </Container>
  );
}
