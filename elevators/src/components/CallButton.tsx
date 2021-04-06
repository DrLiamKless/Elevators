import React, { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import { FloorState } from '../utils/models/Floor';

const Button = styled.button`
  width: 100%;
  height: 100%;
  font-size: 5px;
`

function CallButton ({floorState, ...rest }: {floorState: FloorState} & ComponentPropsWithoutRef<"button">) {
  return (
    <Button {...rest}>
      {floorState}
    </Button>
  );
}

export default CallButton;
