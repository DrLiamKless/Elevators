import { FloorState } from "./models/Floor"

export const renderButtonStyling = (floorState: FloorState) => {
  if (floorState === "call") {
    return 'background-color: #5BCD88; border: 1px solid grey;'
  } else if (floorState === "waiting") {
    return 'background-color: #ED484D; border: 1px solid grey;'
  } else if (floorState === "arrived") {
    return 'background-color: unset; opacity: 1; border: 1px solid green;'
  }
}

export const renderButtonTitleStyling = (floorState: FloorState) => {
  if (floorState === "call") {
    return 'color: white; text-transform: capitalize; font-weight: 500;'
  } else if (floorState === "waiting") {
    return 'color: white; text-transform: capitalize; font-weight: 500;'
  } else if (floorState === "arrived") {
    return 'color: #5BCD88; text-transform: uppercase; font-weight: 600;'
  }
}