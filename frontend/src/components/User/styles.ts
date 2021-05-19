import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 60px;
    height: 60px;
    margin-right: 8px;
    border-radius: 50%;
  }

  p {
    color: #fff;
  }

  @media screen and (max-width:1080px) {
    display: none;
  }
`;
