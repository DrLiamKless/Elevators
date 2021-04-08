import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
  flex-direction: column;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const Select = styled.select`
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 600;
  border: none;
  outline: none;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const Label = styled.div`
  font-weight: 600;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
`


const StartButton = styled.button`
  padding:0.7em 1.4em;
  border-radius:0.15em;
  text-transform:uppercase;
  color:#EEEEEE;
  background-color:#3369ff;
  box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
  position:relative;
  
  &:active{
    top:0.2em;
  };
`
  const floorOptions = new Array(10);
  for (let floor = 4; floor <= 10; floor++) {
    floorOptions.push(floor);
  }
  
  const elevatorsOptions = new Array(10);
  for (let elevators = 2; elevators <= 10; elevators++) {
    elevatorsOptions.push(elevators);
  }

function SelectPage({onSubmit}: {onSubmit: (floorsAmount: number, elevatorsAmount: number) => void}) {
  const [floorsAmount, setFloorsAmount] = useState<number>(10);
  const [elevatorsAmount, setElevatorsAmount] = useState<number>(5);

  const onSubmitClick = () => {
    if (floorsAmount && elevatorsAmount) {
      onSubmit(floorsAmount, elevatorsAmount);
    } else {
      return;
    }
  };

  return (
    <Root>
      <Title>Choose how your house will look like</Title>

      <SelectWrapper>
        <Label>Floors</Label>
        <Select onChange={(e) => setFloorsAmount(() => Number(e.target.value))}>
          {floorOptions.map(option => {
            const isSelected = option === floorsAmount
            return (
              <option selected={isSelected} value={option}>{option}</option>
              );
            })}
        </Select>    
      </SelectWrapper>
      
      <SelectWrapper>
        <Label>Elevators</Label>
        <Select onChange={(e) => setElevatorsAmount(() => Number(e.target.value))}>
          {elevatorsOptions.map(option => {
            const isDisabled = option > floorsAmount
            const isSelected = option === elevatorsAmount
            return (
              <option selected={isSelected} disabled={isDisabled} value={option}>
                {option}
              </option>
            );
          })}
        </Select>
      </SelectWrapper>

      <StartButton disabled={elevatorsAmount > floorsAmount} onClick={onSubmitClick}>start</StartButton>  
    </Root>
  );
};

export default SelectPage;
