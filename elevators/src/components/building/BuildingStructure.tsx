import React from 'react';
import { Building } from '../../utils/models/Building';
import Floor from './Floor';

function BuildingStructure({ building }: {building: Building}) {
  
  const floors = new Array(building.numberOfFloors).fill(<Floor numberOfElevators={building.numberOfElevators}/>)
  
  return (
    <div>
      {floors}
    </div>
  );
}

export default BuildingStructure;
