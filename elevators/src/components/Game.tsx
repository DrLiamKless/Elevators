import React, { useState } from 'react';
import { Building } from '../utils/models/Building';
import BuildingStructure from './building/BuildingStructure';

function Game() {
  const [building, setBuilding] = useState(new Building(5, 3));
  
  return (
    <div>
      <BuildingStructure building={building} />
    </div>
  );
}

export default Game;
