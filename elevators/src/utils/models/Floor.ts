export type FloorState = "waiting" | "arrived" | "free";

export class Floor {
  private _floorState: FloorState;

  private _onCallCallback?: (updatedFloor: Floor ,params?: any) => any;
  private _onMoveCallback?: (updatedFloor: Floor ,params?: any) => any;
  private _onArriveCallback?: (updatedFloor: Floor, params?: any) => any;
  private _onBackToFreeCallback?: (updatedFloor: Floor, params?: any) => any;

  constructor(readonly floorNumber: number, readonly numberOfElevators: number) {
    if (floorNumber === 0) {
      this._floorState = "arrived";
    } else {
      this._floorState = "free";
    }
  }

  get floorState() {
    return this._floorState
  };

  set onCallCallback(fn: (updatedFloor: Floor, params?: any) => any) {
    this._onCallCallback = (floor: Floor) => fn(floor);
  }
 
  set onMoveCallback(fn: (updatedFloor: Floor ,params?: any) => any) {
    this._onMoveCallback = (floor: Floor) => fn(floor);
  }

  set onArriveCallback(fn: (updatedFloor: Floor ,params?: any) => any) {
    this._onArriveCallback = (floor: Floor) => fn(floor);
  }

  set onBackToFreeCallback(fn: (updatedFloor: Floor ,params?: any) => any) {
    this._onBackToFreeCallback = (floor: Floor) => fn(floor);
  }

  onElevatorCalledToFloor() {
      this._floorState = "waiting";
      this._onCallCallback?.(this);
      return this;
  }

  onElevatorArrivedToFloor() {
    this._floorState = "arrived";
    this._onArriveCallback?.(this);
    return this;
  }

  onElevatorMovedFromFloor() {
    this._floorState = "free";
    this._onMoveCallback?.(this);
    return this;
  }

  backToBeFree() {
    this._floorState = "free"
    this._onBackToFreeCallback?.(this);
}
 
}