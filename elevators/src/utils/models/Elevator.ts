import { Floor } from "./Floor";

type ElevatorState = "busy" | "arrived" | "free";

export class Elevator {
  private _elevatorState: ElevatorState = "free";
  private _currentFloor: number;

  private _onCallCallback?: (updatedElevator: Elevator ,params?: any) => any;
  private _onMoveCallback?: (updatedElevator: Elevator ,params?: any) => any;
  private _onArriveCallback?: (updatedElevator: Elevator, params?: any) => any;
  private _onBackToFreeCallback?: (updatedElevator: Elevator, params?: any) => any;

  constructor(readonly id: string, private _targetFloor: Floor) {
    this._currentFloor = _targetFloor.floorNumber;
    return
  }

  get elevatorState() {
    return this._elevatorState
  };

  get targetFloor() {
    return this._targetFloor
  };
 
  get currentFloor() {
    return this._currentFloor
  };

  set onCallCallback(fn: (updatedElevator: Elevator ,params?: any) => any) {
    this._onCallCallback = (elevator: Elevator) => fn(elevator);
  }
 
  set onMoveCallback(fn: (updatedElevator: Elevator ,params?: any) => any) {
    this._onMoveCallback = (elevator: Elevator) => fn(elevator);
  }

  set onArriveCallback(fn: (updatedElevator: Elevator ,params?: any) => any) {
    this._onArriveCallback = (elevator: Elevator) => fn(elevator);
  }

  set onBackToFreeCallback(fn: (updatedElevator: Elevator ,params?: any) => any) {
    this._onBackToFreeCallback = (elevator: Elevator) => fn(elevator);
  }
  
  private onMove() {
    
    const arrived = this._currentFloor === this._targetFloor.floorNumber 
    if (arrived) {
      this.onArrive();
      return this;
    } else {
      if (this._currentFloor > this._targetFloor.floorNumber) {
        this._currentFloor--;
      } else if (this._currentFloor < this._targetFloor.floorNumber) {
        this._currentFloor++;
      }
      
      this._onMoveCallback?.(this);
      setTimeout(() => {
        this.onMove();
      }, 1000)
    }
  }

  private onArrive() {
    this._elevatorState = "arrived";
    this._onArriveCallback?.(this);
    this.targetFloor.onElevatorArrivedToFloor();
    
    setTimeout(() => {
      this.backToBeFree();
    }, 1000)
  }

  private backToBeFree() {
      this._elevatorState = "free"
      this._onBackToFreeCallback?.(this);
      this.targetFloor.backToBeFree();
  }

  call(newTargetFloor: Floor) {
      if (newTargetFloor.floorNumber === this._targetFloor.floorNumber) {
        this._elevatorState = "busy";
        this._onCallCallback?.(this);
        this.onArrive();
      } else {
      this._targetFloor.onElevatorMovedFromFloor();
      this._targetFloor = newTargetFloor
      this._elevatorState = "busy";
      this.targetFloor.onElevatorCalledToFloor();
      this._onCallCallback?.(this);
      this.onMove();
      }
  }
 
}