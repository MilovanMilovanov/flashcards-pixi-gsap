import { Graphics, Text } from "pixi.js";

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
  fontSize: number;
}

export interface LabelParameters {
  [index: string]: string | number;
}

export interface ButtonHover {
  (
    button: Graphics,
    buttonSide: Graphics,
    label: Text,
    isHovered: boolean
  ): void;
}

export interface NoParamsVoidFunction {
  (): void;
}
