import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Elevator } from '../../utils/models/Elevator';

const Root = styled.div`
  font-size: 13px;
  padding: 5px;
`

function ElevatorComponent({ elevator }: {elevator: Elevator}) {
  const [elevatorState, setElevatorState] = useState(elevator);

  return (
    <>
    {elevatorState && (
      <Root>
        {`floor ${elevatorState.currentFloor}. and my state is ${elevatorState.elevatorState}`}
      </Root>
      )}
    </>
  );
}

export default ElevatorComponent;
