import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Elevator } from '../../utils/models/Elevator';
import { elevatorSVG } from '../images'

const Root = styled.div<({currentFloor: number})>`
  max-width: 20%;
  min-width: 20%;
  height: 50px;
  align-self: center;
  transition: all 1s ease-in-out;
  ${({currentFloor}) => `transform: translateY${`(-${(currentFloor+1)*100}%);`}`}; 
`;

const ElevatorIcon = styled.img`
  width: 70%;
  height: 70%;
  transform: translateY(25%);
`;

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
      <Root currentFloor={elevatorState.currentFloor}>
        <ElevatorIcon src={elevatorSVG} />
        {/* <p>
          {`${elevatorState.currentFloor} - ${elevatorState.elevatorState}`}
        </p> */}
      </Root>
      )}
    </>
  );
}

export default ElevatorComponent;
