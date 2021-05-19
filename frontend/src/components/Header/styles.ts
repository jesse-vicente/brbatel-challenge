import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 90px;
  padding: 0 1rem;
  background: var(--green);
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  max-width: 1080px;
`;

export const Logo = styled.img`
  max-width: 160px;
  height: auto;
`;
