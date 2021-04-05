import React from 'react';
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

function FloorComponent({ floor, onCall }: {floor: Floor, onCall:  () => false | Elevator}) {

  const shafts = new Array(floor.numberOfElevators).fill(0);
  
  const onElevatorCallToFloor = () => {
    onCall();
  }

  return (
    <FloorWrapper>
      <Shafts>
          {shafts.map(shaft => 
            <Shaft>shaft</Shaft>
            )}
      </Shafts>
      <CallButton onClick={onElevatorCallToFloor}/>
      <div>{floor.floorNumber}</div>
    </FloorWrapper>
  );
}

export default FloorComponent;
