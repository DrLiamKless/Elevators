import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Elevator } from '../../utils/models/Elevator';
import { Floor } from '../../utils/models/Floor';
import CallButton from '../CallButton';

const Shafts = styled.div`
  width: 100%;
  border: 1px solid red;
  display: flex;
  flex-direction: row;
`

const FloorWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`

const Shaft = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  background-color: white;
  padding: 5px;
`

type FloorComponentProps = {
  floor: Floor,
  onElevatorCall: (
    floorNumber: number,
    params?: {
    onElevatorArriveFn?: ((params?: any) => any) | undefined;
    onElevatorMoveFn?: ((params?: any) => any) | undefined;
    } | undefined
  ) => false | Elevator
}

function FloorComponent({ floor, onElevatorCall }: FloorComponentProps) {
  const [floorState, setFloorState] = useState(floor);

  const onElevatorCallToFloor = () => {
    onElevatorCall?.(
      floor.floorNumber,
      {
        onElevatorArriveFn: () => {
          const updatedFloor = floor.onElevatorArrivedToFloor();
          setFloorState(() => updatedFloor);
        }
      }
    );
  }
  
  const shafts = new Array(floor.numberOfElevators).fill(0);

  return (
    <>
      {floorState && (
        <FloorWrapper>
          <Shafts>
            {shafts.map(shaft => 
              <Shaft>shaft</Shaft>
            )}
          </Shafts>
          <CallButton floorState={floorState?.floorState} onClick={onElevatorCallToFloor}/>
          </FloorWrapper>
        )}
    </>
  );
}

export default FloorComponent;
