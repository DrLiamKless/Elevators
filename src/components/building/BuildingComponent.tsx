import React from 'react';
import styled from 'styled-components';
import { Building } from '../../models/Building';
import { Floor } from '../../models/Floor';
import ElevatorComponent from './ElevatorComponent';
import FloorComponent from './FloorComponent';

// Styled Copmonents
const BuildingRoot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const FloorsWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  width: 45%;
  width: 45%;
  background-color: white;
`;

const ElevatorsWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  max-width: 45%;
  min-width: 45%;
  bottom: 0px;
`;


function BuildingComponent({ building }: {building: Building}) {

  const onElevatorCall = (floor: Floor) => {
    const CalledElevator = building.callElevator(floor);
    if(CalledElevator) {
      return CalledElevator
    } else {
      return false
    }
  };

  const answerOrderFromQueue = () => {
    const CalledElevator = building.callElevatorForQueueOrder();
    if(CalledElevator) {
      return CalledElevator
      } else {
        return false
      }
  };

  return (
    <BuildingRoot>  
      <FloorsWrapper>
        {Array.from(building.floors.values()).map(floor => <FloorComponent onElevatorCall={onElevatorCall} floor={floor}/> )}
      </FloorsWrapper>
      
      <ElevatorsWrapper>
        {building.elevators.map(elevator => <ElevatorComponent answerOrderFromQueue={answerOrderFromQueue} elevator={elevator} /> )}
      </ElevatorsWrapper>
    </BuildingRoot>
  );
};

export default BuildingComponent;
