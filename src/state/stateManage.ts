import { NoParamsVoidFunction } from "../interfaces/interfaces";

export default abstract class CardState {
  static isFlipped: boolean;
  isFlipped: boolean = false;

  static toggleFlipState: NoParamsVoidFunction = (): void => {
    this.isFlipped = !this.isFlipped;
  };

  static resetState: NoParamsVoidFunction = (): void => {
    this.isFlipped = false;
  };
}
