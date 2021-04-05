import React, { useState } from 'react';
import styled from 'styled-components';
import { Building } from '../utils/models/Building';
import BuildingStructure from './building/BuildingStructure';


const Root = styled.div`
  width: fit-content;
  height: fit-content;
`

function Game() {
  const [building, setBuilding] = useState(new Building(6, 3));
  
  return (
    <Root>
      <BuildingStructure building={building} />
    </Root>
  );
}

export default Game;
