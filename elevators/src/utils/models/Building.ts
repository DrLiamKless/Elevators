import { Elevator } from "./Elevator";

export class Building {
  static readonly minimumFloors: number = 4;
  // private static elevators: {[id: string]: Elevator};
  private static elevators: Elevator[];

  constructor(
      readonly numberOfFloors: number, 
      readonly numberOfElevators: number
    ) {
    Building.validateNumberOfFloors(numberOfFloors);
    Building.validateNumberOfElevators(numberOfElevators);
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

    this.elevators = [...elevatorsArray];
  }

  // static designElevatorsObject(numberOfElevators: number) {
  //   const elevatorsArray: Elevator[] = [];
  //   for (let i = 0; i < numberOfElevators ; i++) {
  //     const elevator = new Elevator(`elevatorId${i}`);
  //     elevatorsArray.push(elevator);
  //   }

  //   const elevatorsObj = Object.assign({...elevatorsArray});
  //   this.elevators = elevatorsObj;
  // }

  static detectClosestElevator(targetFloor: number) {
    let closestElevator: Elevator | undefined;
    let closestDistance: number;
    this.elevators.forEach(elevator => {
      if (elevator.currentFloor === targetFloor) {
        return elevator;
      };
      
      if (!closestElevator) {
        closestElevator = elevator
        closestDistance = Math.abs(elevator.currentFloor - targetFloor);
      };

      if (Math.abs(elevator.currentFloor - targetFloor) < closestDistance && elevator.elevatorState === "free") {
        closestElevator = elevator;
      }
    })

    if (closestElevator) {
      return closestElevator
    } else { 
      return false 
    };
  }

  static callElevator(targetFloor: number) {
    const closestElevator = this.detectClosestElevator(targetFloor);

    if (closestElevator) {
      closestElevator.onCall(targetFloor);
    } else {
      return
      // TODO: add queue storage of the calls
    }
  }

}