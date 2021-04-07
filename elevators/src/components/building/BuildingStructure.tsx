import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Building } from '../../models/Building';
import { Floor } from '../../models/Floor';
import ElevatorComponent from './ElevatorComponent';
import FloorComponent from './FloorComponent';

const ElevatorsWrapper = styled.div`
  position: relative;
  display: flex;
  max-width: 45%;
  min-width: 45%;
  bottom: 0px;
`

const FloorsWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  max-width: 45%;
  min-width: 45%;
  background-color: white;
`

const Root = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

function BuildingStructure({ building }: {building: Building}) {
  const [buildingState, setBuildingState] = useState<Building>();

  useEffect(() => {
    setBuildingState(building);
  }, [])


  const onElevatorCall = (floor: Floor) => {
    if (buildingState) {
     const CalledElevator = buildingState.callElevator(floor);
     if(CalledElevator) {
       return CalledElevator
      } else {
        return false
      }
    }
  }

  const answerOrderFromQueue = () => {
    if (buildingState) {
      const CalledElevator = buildingState.callElevatorForQueueOrder();
      if(CalledElevator) {
        return CalledElevator
       } else {
         return false
       }
    } else {
      return false
    }
  }

  return (
    <>
      {buildingState && (
        <Root>
          
          <FloorsWrapper>
            {buildingState.floors.map(floor => <FloorComponent onElevatorCall={onElevatorCall} floor={floor}/> )}
          </FloorsWrapper>
          
          <ElevatorsWrapper>
            {buildingState.elevators.map(elevator => <ElevatorComponent answerOrderFromQueue={answerOrderFromQueue} elevator={elevator} /> )}
          </ElevatorsWrapper>

        </Root>
      )}
    </>
  );
}

export default BuildingStructure;
