import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Elevator } from '../../utils/models/Elevator';
import { Floor } from '../../utils/models/Floor';
import CallButton from '../CallButton';

const Shafts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const FloorWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

const Shaft = styled.div`
  max-width: 20%;
  min-width: 20%;
  height: 30px;
  border: 1px solid grey;
  padding: 5px;
`

type FloorComponentProps = {
  floor: Floor,
  onElevatorCall: (floorNumber: number) => false | Elevator | undefined;
}

function FloorComponent({ floor, onElevatorCall }: FloorComponentProps) {
  const [floorState, setFloorState] = useState(floor);

  useEffect(() => {
    floor.onArriveCallback = (updatedFloor: Floor) => {
      // console.log(`floor ${updatedFloor.floorNumber} accepted elevator!`);
      setFloorState(() => Object.assign(Object.create(updatedFloor), updatedFloor));
    }

    floor.onCallCallback = (updatedFloor: Floor) => {
      // console.log(`floor ${updatedFloor.floorNumber} called an elevator!`);
      setFloorState(() => Object.assign(Object.create(updatedFloor), updatedFloor));
    }

    floor.onMoveCallback = (updatedFloor: Floor) => {
      // console.log(`floor ${updatedFloor.floorNumber} just sayd goodbye from elevator!`);
      setFloorState(() => Object.assign(Object.create(updatedFloor), updatedFloor));
    }
    
    floor.onBackToFreeCallback = (updatedFloor: Floor) => {
      // console.log(`floor ${updatedFloor.floorNumber} is free again!`);
      setFloorState(() => Object.assign(Object.create(updatedFloor), updatedFloor));
    }

    setFloorState(floor);
  }, [])

  const onElevatorCallToFloor = () => {
    const elevatorOnTheWay = onElevatorCall(floorState.floorNumber);
  }
  
  const shafts = new Array(floor.numberOfElevators).fill(0);

  return (
    <>
      {floorState && (
        <FloorWrapper>
          <Shafts>
            {shafts.map(shaft => 
              <Shaft />
            )}
          </Shafts>
          <CallButton floorState={floorState?.floorState} onClick={onElevatorCallToFloor}/>
        </FloorWrapper>
        )}
    </>
  );
}

export default FloorComponent;
