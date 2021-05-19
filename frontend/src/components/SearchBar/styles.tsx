import styled from 'styled-components';

export const Container = styled.div`
  max-width: 420px;
  margin: 0 32px;
  outline: 0;
  padding: 16px;
  font-size: 1rem;

  flex: 1;
  display: flex;
  align-items: center;

  border-radius: 25px;
  border: 1px solid rgba(0, 40, 100, .12);;

  background: var(--shape);
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;

  input {
    flex: 1;
    border: 0;
    margin-left: 1rem;

    &:hover, &:focus {
      outline: 0;
    }
  }

  span {
    margin-right: 1rem;
  }
`;
