import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FloorState } from '../../models/Floor';
import useTimer from '../../hooks/useTimer';

// Styled Components
const ShaftRoot = styled.div`
  max-width: 100%;
  min-width: 100%;
  height: 50px;
  border: 1px solid #EEEEEE;
  box-sizing: border-box;

  @media (max-width:1150px) {
    height: 30px;
  }
`;

type ShaftComponentProps = {
  floorState: FloorState,
  elevatorOnWay: boolean,
};

function ShaftComponent({ floorState, elevatorOnWay }: ShaftComponentProps) {
  const { timer, handleStart, handlePause, handleReset } = useTimer();

  useEffect(() => {
    if(floorState === "waiting") {
      handleStart();
    };

    if(floorState === "arrived") {
      handlePause();
    }

    if(floorState === "call") {
      handleReset()
    }
  }, [floorState]);

  return (
    <ShaftRoot>
      {elevatorOnWay && timer.toFixed(1)}
    </ShaftRoot>
  );
};

export default ShaftComponent;
