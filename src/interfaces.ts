import { Graphics } from "pixi.js";

export interface StringDictionary {
  [index: string]: string;
}

export interface NumberDictionary {
  [index: string]: number;
}
export interface CardTextParams {
  wordWrap: boolean;
  wordWrapWidth: number;
  fontFamily: string;
}

export interface LabelParameters {
  [index: string]: string | number;
}

export interface ButtonHover {
  (button: Graphics, isHovered: boolean): void;
}

export interface NoParamsVoidFunction {
  (): void;
}
