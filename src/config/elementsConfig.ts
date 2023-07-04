import { colors } from "../utils/globals";
import {
  CardTextParams,
  NumberDictionary,
  LabelParameters,
} from "../interfaces/interfaces";

export const dropDownConfig: any = {
  fontFamily: "cursive",
  fontSize: 18,
  fontWeight: 200,
  width: 250,
  height: 30,
};

export const textConfig: CardTextParams = {
  wordWrap: true,
  wordWrapWidth: 220,
  fontSize: 20,
  fontFamily: "cursive",
  maxLines: 13,
};

export const cardDimensions: NumberDictionary = {
  width: 250,
  height: 350,
  radius: 13,
};
export const buttonParams: NumberDictionary = {
  width: 120,
  height: 45,
  padding: 10,
};

export const labelConfig: LabelParameters = {
  fill: colors.buttonLabel,
  fontSize: 16,
  fontWeight: 200,
};
