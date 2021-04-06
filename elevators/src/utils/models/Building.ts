import { Elevator } from "./Elevator";
import { Floor } from "./Floor";

export class Building {
  static readonly minimumFloors: number = 4;
  
  readonly elevators: Elevator[];
  readonly floors: Floor[];
  readonly numberOfFloors: number
  readonly numberOfElevators: number

  constructor(
      numberOfFloors: number, 
      numberOfElevators: number
    ) {
    Building.validateNumberOfFloors(numberOfFloors);
    Building.validateNumberOfElevators(numberOfElevators);

    this.numberOfElevators = numberOfElevators;
    this.numberOfFloors = numberOfFloors;
    this.floors = Building.designFloorsArray(numberOfFloors, numberOfElevators);
    const initialFloorZero = this.floors[0];
    this.elevators = Building.designElevatorsArray(numberOfElevators, initialFloorZero);
  }

  private static validateNumberOfFloors(floors: number) {
    const nameIsValid = floors >= Building.minimumFloors;
    if (!nameIsValid) {
      throw Error("The amount of floors given is not valid");
    }
  }

  private static validateNumberOfElevators(numberOfElevators: number) {
    if (numberOfElevators < 2) {
      throw Error("The amount of elevators given is not valid");
    }
  }

  private static designElevatorsArray(numberOfElevators: number, initialFloor: Floor) {
    const elevatorsArray: Elevator[] = [];
    for (let i = 0; i < numberOfElevators ; i++) {
      const elevator = new Elevator(`elevatorId${i}`, initialFloor);
      elevatorsArray.push(elevator);
    }

    return [...elevatorsArray];
  }

  private static designFloorsArray(numberOfFloors: number, numberOfElevators: number) {
    const floorsArray: Floor[] = [];
    for (let i = 0; i < numberOfFloors ; i++) {
      const floor = new Floor(i, numberOfElevators);
      floorsArray.push(floor);
    }

    return [...floorsArray];
  }

  private detectClosestElevator(targetFloor: number) {
    let closestElevator: Elevator | undefined;
    let closestDistance: number;

    this.elevators.forEach(elevator => {
      if (!closestDistance) {
        closestElevator = elevator
        closestDistance = Math.abs(elevator.currentFloor - targetFloor);
      };
      
      if (closestDistance && Math.abs(elevator.currentFloor - targetFloor) < closestDistance) {
        closestElevator = elevator;
        closestDistance = Math.abs(elevator.currentFloor - targetFloor);
        return
      }
    })
    
    if (closestElevator) {
      return closestElevator
    } else { 
      console.log('didnt find');
      return false 
    };
  }

  callElevator(
    targetFloorNumber: number, 
    params?: {
      onElevatorArriveFn?: (params?: any) => any,
      onElevatorMoveFn?: (params?: any) => any,
    }
  ) {
    const targetFloor = this.floors.find(floor => floor.floorNumber === targetFloorNumber);
    const closestElevator = this.detectClosestElevator(targetFloorNumber);
    
    if (closestElevator && targetFloor) {
      closestElevator.onCall(targetFloor, params);
      return closestElevator;
    } else {
      return false
      // TODO: add queue storage of the calls
    }
  }

}