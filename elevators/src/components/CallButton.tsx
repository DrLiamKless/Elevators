import React, { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import { FloorState } from '../utils/models/Floor';

const Button = styled.button`
  width: 50px;
  font-size: 10px;
  position: absolute;
  right: 0;
  transform: translateX(200%);
  outline: none;
  border: 0.5px solid grey;
  padding: 5px;
  border-radius: 5px;
`

const renderButtonBackgroundColor = (floorState: FloorState) => {
  if (floorState === "call") {
    return '#5BCD88'
  } else if (floorState === "waiting") {
    return '#ED484D'
  } else if (floorState === "arrived") {
    return 'rgba(255, 255, 255, 1)'
  }
}

const renderButtonTitleColor = (floorState: FloorState) => {
  if (floorState === "call") {
    return 'white'
  } else if (floorState === "waiting") {
    return 'white'
  } else if (floorState === "arrived") {
    return '#5BCD88'
  }
}

function CallButton ({floorState, ...rest }: {floorState: FloorState} & ComponentPropsWithoutRef<"button">) {
  return (
    <Button 
      style={{
        backgroundColor: renderButtonBackgroundColor(floorState),
        color: renderButtonTitleColor(floorState),
      }} 
      {...rest}
    >
      {floorState}
    </Button>
  );
}

export default CallButton;
