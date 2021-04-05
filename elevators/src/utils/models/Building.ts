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
    this.elevators = Building.designElevatorsArray(numberOfElevators);
    this.floors = Building.designFloorsArray(numberOfFloors, numberOfElevators);
  }

  static validateNumberOfFloors(floors: number) {
    const nameIsValid = floors >= Building.minimumFloors;
    if (!nameIsValid) {
      throw Error("The amount of floors given is not valid");
    }
  }

  static validateNumberOfElevators(numberOfElevators: number) {
    if (numberOfElevators < 2) {
      throw Error("The amount of elevators given is not valid");
    }
  }

  static designElevatorsArray(numberOfElevators: number) {
    const elevatorsArray: Elevator[] = [];
    for (let i = 0; i < numberOfElevators ; i++) {
      const elevator = new Elevator(`elevatorId${i}`);
      elevatorsArray.push(elevator);
    }

    return [...elevatorsArray];
  }

  static designFloorsArray(numberOfFloors: number, numberOfElevators: number) {
    const floorsArray: Floor[] = [];
    for (let i = 0; i < numberOfFloors ; i++) {
      const floor = new Floor(i, numberOfElevators);
      floorsArray.push(floor);
    }

    return [...floorsArray];
  }

  detectClosestElevator(targetFloor: number) {
    let closestElevator: Elevator | undefined;
    let closestDistance: number;

    console.log(closestElevator);
    this.elevators.forEach(elevator => {
      if (!closestDistance) {
        // console.log('first time');
        closestElevator = elevator
        closestDistance = Math.abs(elevator.currentFloor - targetFloor);
      };
      
      if (closestDistance && Math.abs(elevator.currentFloor - targetFloor) < closestDistance) {
        // console.log('changed the closest one');
        closestElevator = elevator;
        closestDistance = Math.abs(elevator.currentFloor - targetFloor);
        return
      }
    })
    
    if (closestElevator) {
      // console.log('find!', closestElevator);
      return closestElevator
    } else { 
      console.log('didnt find');
      return false 
    };
  }

  callElevator(targetFloor: number) {
    const closestElevator = this.detectClosestElevator(targetFloor);
    if (closestElevator) {
      closestElevator.onCall(targetFloor);
      return closestElevator;
    } else {
      return false
      // TODO: add queue storage of the calls
    }
  }

}