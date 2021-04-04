import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  border: 1px solid red;
  display: flex;
  flex-direction: row;
`

const Shaft = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  background-color: white;
  padding: 5px;
`

function Floor({numberOfElevators}: {numberOfElevators: number}) {

  const shafts = new Array(numberOfElevators).fill(0);

  return (
    <Root>
      <>
        {shafts.map(shaft => 
          <Shaft>shaft</Shaft>
        )}
      </>
    </Root>
  );
}

export default Floor;
