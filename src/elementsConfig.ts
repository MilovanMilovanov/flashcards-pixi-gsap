import { colors } from "./globals";
import {
  CardTextParams,
  NumberDictionary,
  LabelParameters,
} from "./interfaces";

export const textConfig: CardTextParams = {
  wordWrap: true,
  wordWrapWidth: 220,
  fontFamily: "cursive",
};

export const cardParams: NumberDictionary = {
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
  fill: colors.btnLabelColor,
  fontSize: 14,
  fontWeight: 600,
};
