import { Container } from './styles';

import avatarImg from '../../assets/avatar.png';

export function User() {
  return (
    <Container>
      <img src={avatarImg} alt="User Avatar"/>
      <p>John Doe</p>
    </Container>
  );
}
