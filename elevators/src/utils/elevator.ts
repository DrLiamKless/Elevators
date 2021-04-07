import { ElevatorState } from "../models/Elevator";

export const renderElevatorColor = (elevatorState: ElevatorState) => {
  if(elevatorState === "free") return 'black';
  if(elevatorState === "arrived") return 'green';
  if(elevatorState === "busy") return 'red';
}