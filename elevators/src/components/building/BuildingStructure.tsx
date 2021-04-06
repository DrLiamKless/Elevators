import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Building } from '../../utils/models/Building';
import ElevatorComponent from './ElevatorComponent';
import FloorComponent from './FloorComponent';

const ElevatorsWrapper = styled.div`
  position: absolute;
  display: flex;
`

const FloorsWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
`

const Root = styled.div`
  position: relative;
`

function BuildingStructure({ building }: {building: Building}) {
  const [buildingState, setBuildingState] = useState<Building>();

  useEffect(() => {
    // TODO: Here set the onCallCallback, etc...
    building.onCallCallback = () => {
      // console.log('building just called the elvator!');
    }

    setBuildingState(building);
  }, [])


  const onElevatorCall = (floorNumber: number) => {
    if (buildingState) {
     const CalledElevator = buildingState.callElevator(floorNumber);
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
