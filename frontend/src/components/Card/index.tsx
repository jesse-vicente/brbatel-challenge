import React, { LiHTMLAttributes } from 'react';

import { Container } from './styles';

type CardProps = LiHTMLAttributes<HTMLLIElement>;

export const Card: React.FC<CardProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      {children}
    </Container>
  )
}
