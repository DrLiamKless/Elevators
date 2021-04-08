import React, { useState } from 'react';
import styled from 'styled-components';
import { Building } from '../models/Building';
import BuildingComponent from './building/BuildingComponent';

// Styled Components
const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 600;
`

function Game() {
  const [building, setBuilding] = useState(new Building(10, 5));

  // TODO: Add Open screen in order to decide how many floors and elevators there are;
  // TODO: Add title;
  return (
    <Root>
      <Title>Elevators</Title>
      <BuildingComponent building={building} />
    </Root>
  );
};

export default Game;
