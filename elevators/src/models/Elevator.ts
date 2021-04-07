import { Floor } from "./Floor";

export type ElevatorState = "busy" | "arrived" | "free";

export class Elevator {
  private _elevatorState: ElevatorState = "free";
  private _targetFloor: Floor | undefined;

  private _onCallCallback?: (updatedElevator: Elevator) => void;
  private _onMoveCallback?: (updatedElevator: Elevator) => void;
  private _onArriveCallback?: (updatedElevator: Elevator) => void;
  private _onBackToFreeCallback?: (updatedElevator: Elevator) => void;

  constructor(readonly shaftNumber: number, private _currentFloor: number) {
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

  set onCallCallback(fn: (updatedElevator: Elevator) => void) {
    this._onCallCallback = (elevator: Elevator) => fn(elevator);
  }
 
  set onMoveCallback(fn: (updatedElevator: Elevator) => void) {
    this._onMoveCallback = (elevator: Elevator) => fn(elevator);
  }

  set onArriveCallback(fn: (updatedElevator: Elevator) => void) {
    this._onArriveCallback = (elevator: Elevator) => fn(elevator);
  }

  set onBackToFreeCallback(fn: (updatedElevator: Elevator) => void) {
    this._onBackToFreeCallback = (elevator: Elevator) => fn(elevator);
  }
  
  private onMove() {
    if (this._targetFloor) {
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
    } else {
      return false;
    }
  }

  private onArrive() {
    if(this._targetFloor) {

      this._elevatorState = "arrived";
      this._onArriveCallback?.(this);
      this._targetFloor.onElevatorArrivedToFloor();
      
      setTimeout(() => {
        this.backToBeFree();
      }, 2000)
    } else {
      return false;
    }
  }

  private backToBeFree() {
    if (this._targetFloor) {
      this._elevatorState = "free"
      this._targetFloor.backToBeFree();
      this._targetFloor = undefined;
      this._onBackToFreeCallback?.(this);
    } else {
      return false
    }
  }

  call(newTargetFloor: Floor) {
      const theElevatorAlreadyOnFloor = (newTargetFloor.floorNumber === this._currentFloor) && this._elevatorState === "free"; 
      if (theElevatorAlreadyOnFloor) {
        this._elevatorState = "busy";
        this._targetFloor = newTargetFloor
        this._targetFloor.onElevatorCalledToFloor(this);
        this._onCallCallback?.(this);
        this.onArrive();
      } else {
        this._targetFloor?.onElevatorLeavedFloor();
        this._targetFloor = newTargetFloor
        this._elevatorState = "busy";
        this._targetFloor.onElevatorCalledToFloor(this);
        this._onCallCallback?.(this);
        this.onMove();
      }
  }
 
}