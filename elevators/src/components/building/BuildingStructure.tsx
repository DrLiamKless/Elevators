import React, { useState } from 'react';
import styled from 'styled-components';
import { Building } from '../../utils/models/Building';
import CallButton from '../CallButton';
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
  const [elevatorsState, setElevatorsState] = useState(building.elevators);


 const onElevatorCall = (
  floorNumber: number,
  params?: {
    onElevatorArriveFn?: (params?: any) => any,
    onElevatorMoveFn?: (params?: any) => any,
    onElevatorLeave?: (params?: any) => any,
  }) => {
    const CalledElevator = building.callElevator(floorNumber, params);
    if(CalledElevator) {
      setElevatorsState(prev => {
        const updatedElevators = [...prev];
        const elevatorIndex = updatedElevators.findIndex(elevator => elevator.id === CalledElevator.id);
        updatedElevators.splice(elevatorIndex, 1, CalledElevator)
        return updatedElevators;
      })
      return CalledElevator
    } else {
      return false
    }
  }

  return (
    <Root>
      <FloorsWrapper>
        {building.floors.map(floor => {
          return (
            <FloorComponent onElevatorCall={onElevatorCall} floor={floor}/>
            )
          })}
      </FloorsWrapper>

      <ElevatorsWrapper>
        {elevatorsState.map(elevator => {
          return (
            <ElevatorComponent elevator={elevator}/>
          )
        })}
      </ElevatorsWrapper>
    </Root>
  );
}

export default BuildingStructure;
