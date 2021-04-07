import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { renderFloorNumber } from '../../utils/floor';
import { Elevator } from '../../models/Elevator';
import { Floor } from '../../models/Floor';
import CallButton from '../CallButton';
import ShaftComponent from './ShaftComponent';

const Shafts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const FloorWrapper = styled.div`
  max-width: 20%;
  min-width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
`

const FloorNumber = styled.div`
  width: 100px;
  font-size: 15px;
  position: absolute;
  left: 0;
  text-align: right;
  font-weight: 600;
  padding: 0px 10px;
  transform: translateX(-100%);
`

type FloorComponentProps = {
  floor: Floor,
  onElevatorCall: (floor: Floor) => false | Elevator | undefined;
}

function FloorComponent({ floor, onElevatorCall }: FloorComponentProps) {
  const [floorState, setFloorState] = useState(floor);

  useEffect(() => {
    
    floor.onInviteCallback = (updatedFloor: Floor) => {
      setFloorState(() => Object.assign(Object.create(updatedFloor), updatedFloor));
    }

    floor.onCallCallback = (updatedFloor: Floor) => {
      setFloorState(() => Object.assign(Object.create(updatedFloor), updatedFloor));
    }
    
    floor.onMoveCallback = (updatedFloor: Floor) => {
      setFloorState(() => Object.assign(Object.create(updatedFloor), updatedFloor));
    }

    floor.onArriveCallback = (updatedFloor: Floor) => {
      setFloorState(() => Object.assign(Object.create(updatedFloor), updatedFloor));
    }
    
    floor.onBackToFreeCallback = (updatedFloor: Floor) => {
      // console.log(`floor ${updatedFloor.floorNumber} is free again!`);
      setFloorState(() => Object.assign(Object.create(updatedFloor), updatedFloor));
    }

    setFloorState(floor);
  }, [])

  const onElevatorCallToFloor = () => {
    if (floorState.floorState === "call") {
      onElevatorCall(floorState);
    }
  }
  
  const shafts = new Array(floor.numberOfElevators).fill(0);

  return (
    <>
      {floorState && (
        <FloorWrapper>
          <FloorNumber>{renderFloorNumber(floorState.floorNumber)}</FloorNumber>
          <Shafts>
            {shafts.map((shaft, i) => 
              <ShaftComponent
                key={i}
                elevatorOnWay={floorState.elevatorOnWay?.shaftNumber === i}
                floorState={floorState.floorState}
              />
            )}
          </Shafts>
          <CallButton floorState={floorState?.floorState} onClick={onElevatorCallToFloor}/>
        </FloorWrapper>
        )}
    </>
  );
}

export default FloorComponent;
