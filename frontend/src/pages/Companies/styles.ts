import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 2rem 0;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  @media screen and (max-width:1080px) {
    padding: 2rem 1rem;
  }
`;

export const Title = styled.h1`
  color: var(--text-title);
  font-size: 2rem;
`;

export const Button = styled.button`
  width: 180px;
  height: 45px;
  border-radius: 25px;
  color: var(--shape);
  background: #d0b27e;
  border: 0;
  font-size: 1rem;
  font-weight: 600;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const List = styled.ul`
  list-style: none;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  justify-content: center;
`;

export const CardContent = styled.p`
  color: #555A64;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0;
`;
