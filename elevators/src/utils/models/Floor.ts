type FloorState = "waiting" | "arrived" | "free";

export class Floor {
  private _floorState: FloorState;

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

  onCall(callFn: () => boolean) {
      this._floorState = "waiting";
  }

  onArrive() {
    this._floorState = "arrived";
  }
 
}