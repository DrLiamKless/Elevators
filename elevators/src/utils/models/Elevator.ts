import { Floor } from "./Floor";

type ElevatorState = "busy" | "arrived" | "free";

export class Elevator {
  private _elevatorState: ElevatorState = "free";
  private _currentFloor: number;

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
  
  private onMove(
    params?: {
      onElevatorArriveFn?: (params?: any) => any,
      onElevatorMoveFn?: (params?: any) => any,
    }
  ) {
    
    const arrived = this._currentFloor === this._targetFloor.floorNumber 
    if (arrived) {
      
      const onArrive = () => {
        params?.onElevatorArriveFn?.();
        this.targetFloor.onElevatorArrivedToFloor();
      }

      this.onArrive(onArrive);
      return this;
    }

    if (this._currentFloor > this._targetFloor.floorNumber) {
      this._currentFloor--;
    } else if (this._currentFloor < this._targetFloor.floorNumber) {
      this._currentFloor++;
    }

    const move = () => {
      params?.onElevatorMoveFn?.();
      this.onMove();
    }
    move();
  }

  onCall(
    targetFloor: Floor,
    params?: {
      onElevatorArriveFn?: (params?: any) => any,
      onElevatorMoveFn?: (params?: any) => any,
    }
    ) {
      if (targetFloor.floorNumber !== this._targetFloor.floorNumber) {
        this._targetFloor.onElevatorMovedFromFloor();
        this._targetFloor = targetFloor
        this._elevatorState = "busy";
        this.onMove(params);
      }
  }

  onArrive(onArriveFn?: (params?: any) => any) {
      this._elevatorState = "arrived";
      onArriveFn?.();
  }
 
}