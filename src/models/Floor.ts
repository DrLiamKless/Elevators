import { Elevator } from "./Elevator";

export type FloorState = "waiting" | "arrived" | "call";

export class Floor {
  private _floorState: FloorState;
  private _elevatorOnWay: Elevator | undefined;

  private _onInviteCallback?: (updatedFloor: Floor) => void;
  private _onCallCallback?: (updatedFloor: Floor) => void;
  private _onMoveCallback?: (updatedFloor: Floor) => void;
  private _onArriveCallback?: (updatedFloor: Floor) => void;
  private _onBackToFreeCallback?: (updatedFloor: Floor) => void;

  constructor(readonly floorNumber: number, readonly numberOfElevators: number) {
    this._floorState = "call";
  }

  get floorState() {
    return this._floorState
  };
 
  get elevatorOnWay() {
    return this._elevatorOnWay
  };

  set onInviteCallback(fn: (updatedFloor: Floor) => void) {
    this._onInviteCallback = (floor: Floor) => fn(floor);
  }

  set onCallCallback(fn: (updatedFloor: Floor) => void) {
    this._onCallCallback = (floor: Floor) => fn(floor);
  }
 
  set onMoveCallback(fn: (updatedFloor: Floor) => void) {
    this._onMoveCallback = (floor: Floor) => fn(floor);
  }

  set onArriveCallback(fn: (updatedFloor: Floor) => void) {
    this._onArriveCallback = (floor: Floor) => fn(floor);
  }

  set onBackToFreeCallback(fn: (updatedFloor: Floor) => void) {
    this._onBackToFreeCallback = (floor: Floor) => fn(floor);
  }

  onFloorInvitedElevator() {
      this._floorState = "waiting";
      this._onInviteCallback?.(this);
      return this;
  }

  onElevatorCalledToFloor(elevator: Elevator) {
      this._elevatorOnWay = elevator;
      this._onCallCallback?.(this);
      return this;
  }

  onElevatorArrivedToFloor() {
    this._floorState = "arrived";
    this._onArriveCallback?.(this);
    return this;
  }

  onElevatorLeavedFloor() {
    this._floorState = "call";
    this._onMoveCallback?.(this);
    return this;
  }

  backToBeFree() {
    this._floorState = "call"
    this._elevatorOnWay = undefined;
    this._onBackToFreeCallback?.(this);
}
 
}