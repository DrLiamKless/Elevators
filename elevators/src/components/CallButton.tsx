import React, { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 100%;
  font-size: 5px;
`

function CallButton ({ ...rest }: ComponentPropsWithoutRef<"button">) {
  return (
    <Button {...rest}>
      call button
    </Button>
  );
}

export default CallButton;
