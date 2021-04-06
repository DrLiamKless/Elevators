import React, { useState } from 'react';
import styled from 'styled-components';
import { Building } from '../utils/models/Building';
import BuildingStructure from './building/BuildingStructure';


const Root = styled.div`
  width: 100%;
  height: 100%;
  background-color: #EEEEEE;
  justify-self: center;
`

function Game() {
  const [building, setBuilding] = useState(new Building(10, 5));
  
  return (
    <Root>
      <BuildingStructure building={building} />
    </Root>
  );
}

export default Game;
