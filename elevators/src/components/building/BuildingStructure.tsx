import React from 'react';
import styled from 'styled-components';
import { Building } from '../../utils/models/Building';
import CallButton from '../CallButton';
import Floor from './Floor';

const FloorWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`

function BuildingStructure({ building }: {building: Building}) {
  
  const floors = new Array(building.numberOfFloors).fill(0);
  
  return (
    <div>
      {floors.map(floor => {
        return (
          <FloorWrapper>
            <Floor numberOfElevators={building.numberOfElevators}/>
            <CallButton />
          </FloorWrapper>
        )
      })}
    </div>
  );
}

export default BuildingStructure;
