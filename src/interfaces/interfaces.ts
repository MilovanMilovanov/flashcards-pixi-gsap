import { Graphics, Text } from "pixi.js";
import DropdownController from "../components/dropdownController";

export interface DropdownMenu {
  [index: string]: DropdownController;
}

export interface DropdownLists {
  [index: string]: string | string[];
}

export interface DropdownElements {
  option: Graphics;
  label: Text;
  currentIndex: number;
  dropdownName: string;
  handleDropdownToggle: Function;
  onPointerIn: Function;
  onPointerOut: Function;
}

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
  maxLines: 13;
}

export interface LabelParameters {
  [index: string]: string | number;
}

export interface ButtonEventListeners {
  button: Graphics;
  buttonSide: Graphics;
  label: Text;
  navigateFunction: Function;
  onButtonHover: (
    button: Graphics,
    buttonSide: Graphics,
    label: Text,
    isHovered: boolean
  ) => void;
}
