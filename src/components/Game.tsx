import React, { useState } from 'react';
import styled from 'styled-components';
import { Building } from '../models/Building';
import BuildingComponent from './building/BuildingComponent';
import SelectPage from './SelectPage';

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
  const [building, setBuilding] = useState<Building>();

  const onSubmit = (floorsAmount: number, elevatorsAmount: number) => {
    setBuilding(() => new Building(floorsAmount, elevatorsAmount))
  }

  return (
    <>
    { building ? (
      <Root>
        <Title>Elevators</Title>
        <BuildingComponent building={building} />
      </Root>
    ) : (
      <SelectPage onSubmit={onSubmit} />
    )
    }
    </>
  );
};

export default Game;
