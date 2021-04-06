import React, { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import { FloorState } from '../utils/models/Floor';

const Button = styled.button`
  width: fit-content;
  height: fit-content;
  font-size: 5px;
  position: absolute;
  right: -50px;
`

function CallButton ({floorState, ...rest }: {floorState: FloorState} & ComponentPropsWithoutRef<"button">) {
  return (
    <Button {...rest}>
      {floorState}
    </Button>
  );
}

export default CallButton;
