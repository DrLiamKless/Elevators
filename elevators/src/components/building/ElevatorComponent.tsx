import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Elevator } from '../../utils/models/Elevator';

const Root = styled.div`
  font-size: 13px;
  max-width: 20%;
  min-width: 20%;
  max-height: 30px;
  text-align: center;
`

function ElevatorComponent({ elevator, answerOrderFromQueue }: {elevator: Elevator, answerOrderFromQueue: () => false | Elevator}) {
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
      answerOrderFromQueue();
    }

    setElevatorState(elevator);
  }, [])

  return (
    <>
    {elevatorState && (
      <Root>
        <p>
          {`${elevatorState.currentFloor} - ${elevatorState.elevatorState}`}
        </p>
      </Root>
      )}
    </>
  );
}

export default ElevatorComponent;
