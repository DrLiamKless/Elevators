import React, { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import { renderButtonBackgroundColor, renderButtonTitleStyling } from '../utils/callButton';
import { FloorState } from '../utils/models/Floor';

const Button = styled.button<({floorState: FloorState})>`
  width: 80px;
  font-size: 10px;
  position: absolute;
  text-align: center;
  text-align: center;
  right: 0;
  transform: translateX(150%);
  outline: none;
  border: 0.5px solid grey;
  box-sizing: border-box;
  padding: 5px 15px;
  border-radius: 2px;
  ${({floorState}) => `${renderButtonBackgroundColor(floorState)} ${renderButtonTitleStyling(floorState)}`}
`

function CallButton ({floorState, ...rest }: {floorState: FloorState} & ComponentPropsWithoutRef<"button">) {
  return (
    <Button floorState={floorState} {...rest}>
      {floorState}
    </Button>
  );
}

export default CallButton;
