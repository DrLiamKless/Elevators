import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { elevatorUtils } from '../../utils';
import { Elevator, ElevatorState } from '../../models/Elevator';
import elevatorArrivedSound from '../../audio/elevator-arrived-sound.mp3';
import useAudio from '../../hooks/useAudio';

// Styled Components
const ElevatorRoot = styled.div<({currentFloor: number})>`
  max-width: 20%;
  min-width: 20%;
  height: 50px;
  align-self: center;
  transition: all 1.01s linear;
  ${({currentFloor}) => `transform: translateY${`(-${(currentFloor+1)*100}%);`}`}; 

  @media (max-width:1150px) {
    max-width: 20%;
    min-width: 20%;
    height: 30px;
  }
`;

const ElevatorSvg = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg", 
  viewBox: "0 0 50 50",
})<({elevatorState: ElevatorState})>`
  width: 50%;
  height: 50%;
  transform: translateY(90%);
  fill: ${({elevatorState}) => elevatorUtils.renderElevatorColor(elevatorState)};
`;

// Elevator Icon
const ElevatorIcon = ({elevatorState}: {elevatorState: ElevatorState}) => {
  return (
    <ElevatorSvg elevatorState={elevatorState}>
      <path d="M 15.875 0 C 15.617188 0.0351563 15.378906 0.167969 15.21875 0.375 L 10.21875 6.375 C 9.976563 6.675781 9.929688 7.085938 10.097656 7.433594 C 10.265625 7.78125 10.617188 8 11 8 L 21 8 C 21.382813 8 21.734375 7.78125 21.902344 7.433594 C 22.070313 7.085938 22.023438 6.675781 21.78125 6.375 L 16.78125 0.375 C 16.566406 0.101563 16.222656 -0.0429688 15.875 0 Z M 29.8125 0 C 29.460938 0.0625 29.171875 0.308594 29.046875 0.640625 C 28.925781 0.976563 28.992188 1.351563 29.21875 1.625 L 34.21875 7.625 C 34.410156 7.863281 34.695313 8 35 8 C 35.304688 8 35.589844 7.863281 35.78125 7.625 L 40.78125 1.625 C 41.023438 1.324219 41.070313 0.914063 40.902344 0.566406 C 40.734375 0.21875 40.382813 0 40 0 L 30 0 C 29.96875 0 29.9375 0 29.90625 0 C 29.875 0 29.84375 0 29.8125 0 Z M 32.125 2 L 37.875 2 L 35 5.4375 Z M 16 2.5625 L 18.875 6 L 13.125 6 Z M 3 10 C 1.355469 10 0 11.355469 0 13 L 0 47 C 0 48.644531 1.355469 50 3 50 L 47 50 C 48.644531 50 50 48.644531 50 47 L 50 13 C 50 11.355469 48.644531 10 47 10 Z M 3 12 L 47 12 C 47.554688 12 48 12.445313 48 13 L 48 47 C 48 47.554688 47.554688 48 47 48 L 3 48 C 2.445313 48 2 47.554688 2 47 L 2 13 C 2 12.445313 2.445313 12 3 12 Z M 11 14 C 8.800781 14 7 15.800781 7 18 C 7 20.199219 8.800781 22 11 22 C 13.199219 22 15 20.199219 15 18 C 15 15.800781 13.199219 14 11 14 Z M 11 22 C 7.675781 22 5 24.675781 5 28 L 5 35 C 4.996094 35.386719 5.214844 35.738281 5.5625 35.90625 L 7 36.625 L 7 45 C 7 45.550781 7.449219 46 8 46 L 14 46 C 14.550781 46 15 45.550781 15 45 L 15 36.625 L 16.4375 35.90625 C 16.785156 35.738281 17.003906 35.386719 17 35 L 17 28 C 17 24.675781 14.324219 22 11 22 Z M 25 14 C 22.800781 14 21 15.800781 21 18 C 21 20.199219 22.800781 22 25 22 C 27.199219 22 29 20.199219 29 18 C 29 15.800781 27.199219 14 25 14 Z M 25 22 C 21.675781 22 19 24.675781 19 28 L 19 35 C 18.996094 35.386719 19.214844 35.738281 19.5625 35.90625 L 21 36.625 L 21 45 C 21 45.550781 21.449219 46 22 46 L 28 46 C 28.550781 46 29 45.550781 29 45 L 29 36.625 L 30.4375 35.90625 C 30.785156 35.738281 31.003906 35.386719 31 35 L 31 28 C 31 24.675781 28.324219 22 25 22 Z M 39 14 C 36.800781 14 35 15.800781 35 18 C 35 20.199219 36.800781 22 39 22 C 41.199219 22 43 20.199219 43 18 C 43 15.800781 41.199219 14 39 14 Z M 39 22 C 35.675781 22 33 24.675781 33 28 L 33 35 C 32.996094 35.386719 33.214844 35.738281 33.5625 35.90625 L 35 36.625 L 35 45 C 35 45.550781 35.449219 46 36 46 L 42 46 C 42.550781 46 43 45.550781 43 45 L 43 36.625 L 44.4375 35.90625 C 44.785156 35.738281 45.003906 35.386719 45 35 L 45 28 C 45 24.675781 42.324219 22 39 22 Z M 11 16 C 12.117188 16 13 16.882813 13 18 C 13 19.117188 12.117188 20 11 20 C 9.882813 20 9 19.117188 9 18 C 9 16.882813 9.882813 16 11 16 Z M 25 16 C 26.117188 16 27 16.882813 27 18 C 27 19.117188 26.117188 20 25 20 C 23.882813 20 23 19.117188 23 18 C 23 16.882813 23.882813 16 25 16 Z M 39 16 C 40.117188 16 41 16.882813 41 18 C 41 19.117188 40.117188 20 39 20 C 37.882813 20 37 19.117188 37 18 C 37 16.882813 37.882813 16 39 16 Z M 11 24 C 13.277344 24 15 25.722656 15 28 L 15 34.375 L 13.5625 35.09375 C 13.214844 35.261719 12.996094 35.613281 13 36 L 13 44 L 9 44 L 9 36 C 9.003906 35.613281 8.785156 35.261719 8.4375 35.09375 L 7 34.375 L 7 28 C 7 25.722656 8.722656 24 11 24 Z M 25 24 C 27.277344 24 29 25.722656 29 28 L 29 34.375 L 27.5625 35.09375 C 27.214844 35.261719 26.996094 35.613281 27 36 L 27 44 L 23 44 L 23 36 C 23.003906 35.613281 22.785156 35.261719 22.4375 35.09375 L 21 34.375 L 21 28 C 21 25.722656 22.722656 24 25 24 Z M 39 24 C 41.277344 24 43 25.722656 43 28 L 43 34.375 L 41.5625 35.09375 C 41.214844 35.261719 40.996094 35.613281 41 36 L 41 44 L 37 44 L 37 36 C 37.003906 35.613281 36.785156 35.261719 36.4375 35.09375 L 35 34.375 L 35 28 C 35 25.722656 36.722656 24 39 24 Z"/>
    </ElevatorSvg>
  )
};

function ElevatorComponent({ elevator, answerOrderFromQueue }: {elevator: Elevator, answerOrderFromQueue: () => false | Elevator}) {
  const [elevatorState, setElevatorState] = useState<Elevator>();
  const { toggleAudio } = useAudio(elevatorArrivedSound);

  useEffect(() => {
    
    elevator.onCallCallback = (updatedElevator: Elevator) => {
      setElevatorState(Object.assign(Object.create(updatedElevator), updatedElevator));
    }
    
    elevator.onMoveCallback = (updatedElevator: Elevator) => {
      setElevatorState(Object.assign(Object.create(updatedElevator), updatedElevator));
    }
    
    elevator.onBackToFreeCallback = (updatedElevator: Elevator) => {
      setElevatorState(Object.assign(Object.create(updatedElevator), updatedElevator));
      answerOrderFromQueue();
    }
    
    elevator.onArriveCallback = (updatedElevator: Elevator) => {
      toggleAudio()
      setElevatorState(Object.assign(Object.create(updatedElevator), updatedElevator));
    }
    
    setElevatorState(elevator);
  }, []);

  return (
    <>
    {elevatorState && (
      <ElevatorRoot currentFloor={elevatorState.currentFloor}>
        <ElevatorIcon elevatorState={elevator.elevatorState}/>
      </ElevatorRoot>
      )}
    </>
  );
};

export default ElevatorComponent;
