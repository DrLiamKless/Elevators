import React, { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import { renderButtonStyling, renderButtonTitleStyling } from '../utils/callButton';
import { FloorState } from '../models/Floor';

const Button = styled.button<({floorState: FloorState})>`
  width: 60px;
  font-size: 10px;
  position: absolute;
  text-align: center;
  text-align: center;
  right: 0;
  transform: translateX(150%);
  outline: none;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 2px;
  ${({floorState}) => `${renderButtonStyling(floorState)} ${renderButtonTitleStyling(floorState)}`}
`

function CallButton ({floorState, ...rest }: {floorState: FloorState} & ComponentPropsWithoutRef<"button">) {
  return (
    <Button floorState={floorState} {...rest}>
      {floorState}
    </Button>
  );
}

export default CallButton;
