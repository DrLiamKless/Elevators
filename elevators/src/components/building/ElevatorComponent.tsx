import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createNoSubstitutionTemplateLiteral } from 'typescript';
import { Elevator } from '../../utils/models/Elevator';

const Root = styled.div`
  font-size: 13px;
  padding: 5px;
`

function ElevatorComponent({ elevator }: {elevator: Elevator}) {
  const [elevatorState, setElevatorState] = useState<Elevator>();

  useEffect(() => {
    elevator.onArriveCallback = (updatedElevator: Elevator) => {
      // console.log('elevator arrived to floor!', updatedElevator.currentFloor);
      setElevatorState(Object.assign(Object.create(updatedElevator), updatedElevator));
    }

    elevator.onCallCallback = (updatedElevator: Elevator) => {
      // console.log('elevator called to floor!', updatedElevator.targetFloor.floorNumber);
      setElevatorState(Object.assign(Object.create(updatedElevator), updatedElevator));
    }

    elevator.onMoveCallback = (updatedElevator: Elevator) => {
      // console.log('elevator moved to floor!', updatedElevator.currentFloor);
      setElevatorState(Object.assign(Object.create(updatedElevator), updatedElevator));
    }

    elevator.onBackToFreeCallback = (updatedElevator: Elevator) => {
      // console.log('elevator is free again on floor!', updatedElevator.currentFloor);
      setElevatorState(Object.assign(Object.create(updatedElevator), updatedElevator));
    }

    setElevatorState(elevator);
  }, [])

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
