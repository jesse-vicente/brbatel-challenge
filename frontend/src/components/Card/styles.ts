import styled from 'styled-components';

export const Container = styled.li`
  height: 250px;
  padding: 1rem;
  cursor: pointer;
  border-radius: 25px;
  background: var(--shape);
  list-style-position: inside;

  display: flex;
  justify-content: center;
  flex-direction: column;

  p {
    color: #555A64;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
