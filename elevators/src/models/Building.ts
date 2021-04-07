import { Elevator } from "./Elevator";
import { Floor } from "./Floor";

// TODO: make classes more clear;

export class Building {
  static readonly minimumFloors: number = 4;
  static readonly initialElevatorsFloor: number = 0;
  
  readonly elevators: Elevator[];
  readonly floors: Floor[];
  readonly numberOfFloors: number;
  readonly numberOfElevators: number;

  private _ordersQueue: number[] = [];
  private _onCallCallback?: (params?: void) => void;

  constructor(
      numberOfFloors: number, 
      numberOfElevators: number
    ) {
    Building.validateNumberOfFloors(numberOfFloors);
    Building.validateNumberOfElevators(numberOfElevators);

    this.numberOfElevators = numberOfElevators;
    this.numberOfFloors = numberOfFloors;
    this.floors = Building.designFloorsArray(numberOfFloors, numberOfElevators);
    this.elevators = Building.designElevatorsArray(numberOfElevators, Building.initialElevatorsFloor);
  }

  private static validateNumberOfFloors(floors: number) {
    const numberIsValid = (floors >= Building.minimumFloors) && (floors > this.initialElevatorsFloor);
    if (!numberIsValid) {
      throw Error("The amount of floors given is not valid");
    }
  }

  private static validateNumberOfElevators(numberOfElevators: number) {
    if (numberOfElevators < 2) {
      throw Error("The amount of elevators given is not valid");
    }
  }

  private static designElevatorsArray(numberOfElevators: number, initialFloor: number) {
    const elevatorsArray: Elevator[] = [];
    for (let i = 0; i < numberOfElevators ; i++) {
      const elevator = new Elevator(i, initialFloor);
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
  };

  private detectClosestElevator(targetFloorNumber: number) {
    let closestElevator: Elevator | undefined;
    let closestDistance: number;

    const existingElevatorInFloor = this.elevators.find(elevator => {
      return (elevator.currentFloor === targetFloorNumber) && (elevator.elevatorState === "free")
    });
    if(existingElevatorInFloor) {
      return existingElevatorInFloor;
    } else {
      this.elevators.forEach(elevator => {
        if (elevator.elevatorState === "free") {
          if (!closestDistance) {
            closestElevator = elevator
            closestDistance = Math.abs(elevator.currentFloor - targetFloorNumber);
          } else if (Math.abs(elevator.currentFloor - targetFloorNumber) < closestDistance) {
            closestElevator = elevator;
            closestDistance = Math.abs(elevator.currentFloor - targetFloorNumber);
          }
        } else {
          return;
        }
      })
    }
    
    if (closestElevator) {
      return closestElevator
    } else { 
      return false 
    };
  };

  private addToOrderQueue(floorToAdd: Floor) {
    if (!this._ordersQueue.includes(floorToAdd.floorNumber)) {
      this._ordersQueue.push(floorToAdd.floorNumber);
      const floorAdded = this.floors.find(floor => floor.floorNumber === floorToAdd.floorNumber);
      floorAdded?.onFloorInvitedElevator();
    }
  }

  private getOrderFromQueue() {
      const firstOrder = this._ordersQueue.shift();
      if (typeof firstOrder === 'number') {
        const floorOrdered = this.floors.find(floor => floor.floorNumber === firstOrder);
        return floorOrdered
      } else {
        return false
      }
  }

  set onCallCallback(fn: () => void) {
    this._onCallCallback = () => fn();
  };

  callElevator(targetFloor: Floor) {
    if (targetFloor) {
      targetFloor.onFloorInvitedElevator();
      const closestElevator = this.detectClosestElevator(targetFloor.floorNumber);
      // const targetFloor = this.floors.find(floor => floor.floorNumber === targetFloorNumber);
      if (closestElevator) {
        if (targetFloor) {
          this._onCallCallback?.();
          closestElevator.call(targetFloor);
          return closestElevator;
        }
      } else {
        this.addToOrderQueue(targetFloor)
        return false
      }
    } return false;
  }

  callElevatorForQueueOrder() {
    const orderFromQueue = this.getOrderFromQueue();
    if (orderFromQueue) {
      const elevatorCalled = this.callElevator(orderFromQueue);
      return elevatorCalled;
    } else {
      return false
    }
  }

}