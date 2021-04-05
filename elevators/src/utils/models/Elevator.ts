type ElevatorState = "busy" | "arrived" | "free";

export class Elevator {
  private _elevatorState: ElevatorState = "free";
  private _targetFloor: number = 0;
  private _currentFloor: number = 0;

  constructor(readonly id: string) {
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
  
  private move() {
    if (this._currentFloor === this._targetFloor) {
      this.onArrive();
      return;
    }

    if (this._currentFloor > this._targetFloor) {
      this._currentFloor--;
    } else if (this._currentFloor < this._targetFloor) {
      this._currentFloor++;
    }

    this.move();
  }

  onCall(newFloor: number) {
    this._targetFloor = newFloor;

    this._elevatorState = "busy";
    this.move();
  }

  onArrive() {
    this._elevatorState = "arrived";
  }
 
}