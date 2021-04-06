import { Elevator } from "./Elevator";
import { Floor } from "./Floor";

export class Building {
  static readonly minimumFloors: number = 4;
  static readonly initialElevatorsFloor: number = 0;
  
  readonly elevators: Elevator[];
  readonly floors: Floor[];
  readonly numberOfFloors: number;
  readonly numberOfElevators: number;

  private _ordersQueue: number[] = [];
  private _onCallCallback?: (params?: any) => any;

  constructor(
      numberOfFloors: number, 
      numberOfElevators: number
    ) {
    Building.validateNumberOfFloors(numberOfFloors);
    Building.validateNumberOfElevators(numberOfElevators);

    this.numberOfElevators = numberOfElevators;
    this.numberOfFloors = numberOfFloors;
    this.floors = Building.designFloorsArray(numberOfFloors, numberOfElevators);
    const initialFloor = this.floors[Building.initialElevatorsFloor];
    this.elevators = Building.designElevatorsArray(numberOfElevators, initialFloor);
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
  };

  private detectClosestElevator(targetFloor: number) {
    let closestElevator: Elevator | undefined;
    let closestDistance: number;

    const existingElevatorInFloor = this.elevators.find(elevator => {
      return (elevator.currentFloor === targetFloor) && (elevator.elevatorState === "free")
    });
    if(existingElevatorInFloor) {
      return existingElevatorInFloor;
    } else {
      this.elevators.forEach(elevator => {
        if (elevator.elevatorState === "free") {
          if (!closestDistance) {
            closestElevator = elevator
            closestDistance = Math.abs(elevator.currentFloor - targetFloor);
            return;
          } else if (Math.abs(elevator.currentFloor - targetFloor) < closestDistance) {
            closestElevator = elevator;
            closestDistance = Math.abs(elevator.currentFloor - targetFloor);
            return;
          }
        } else {
          return;
        }
      })
    }
    
    if (closestElevator) {
      return closestElevator
    } else { 
      console.log('didnt find');
      return false 
    };
  };

  private addToOrderQueue(floorNumber: number) {
    if (!this._ordersQueue.includes(floorNumber)) {
      this._ordersQueue.push(floorNumber);
    }
  }

  private getOrderFromQueue() {
    if (!!this._ordersQueue.length) {
      const firstOrder = this._ordersQueue.shift();
      if (typeof firstOrder === 'number') {
        return firstOrder
      } else {
        return false
      }
    } else {
      return false
    }
  }

  set onCallCallback(fn: (params?: any) => any) {
    this._onCallCallback = () => fn(this);
  };

  callElevator(
    targetFloorNumber: number, 
  ) {
    const targetFloor = this.floors.find(floor => floor.floorNumber === targetFloorNumber);
    const closestElevator = this.detectClosestElevator(targetFloorNumber);
    
    if (closestElevator && targetFloor) {
      this._onCallCallback?.();
      closestElevator.call(targetFloor);
      return closestElevator;
    } else {
      this.addToOrderQueue(targetFloorNumber)
      return false
      // TODO: add queue storage of the calls
    }
  }

  callElevatorForQueueOrder() {
    const orderFromQueue = this.getOrderFromQueue();
    if (typeof orderFromQueue === 'number') {
      const elevatorCalled = this.callElevator(orderFromQueue);
      return elevatorCalled;
    } else {
      return false
    }
  }

}