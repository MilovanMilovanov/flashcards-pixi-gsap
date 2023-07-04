import { Graphics, Text } from "pixi.js";
import { gsap } from "gsap";
import { buttonParams } from "../config/elementsConfig";
import { colors } from "../utils/globals";

export const buttonAnimation = (
  buttonSide: Graphics,
  label: Text,
  isHovered: boolean
): void => {
  const targetAngle = isHovered ? -5 : 0;
  const state = { angle: isHovered ? -15 : 0 };

  gsap.to(state, {
    duration: 0.4,
    angle: targetAngle,
    onUpdate: () => {
      buttonSide.clear();
      buttonSide.beginFill(
        isHovered ? colors.buttonSideHover : colors.buttonSide
      );
      buttonSide.drawPolygon([
        label.text === "Prev Card" ? 15 : -15,
        0,
        0,
        state.angle,
        0,
        buttonParams.height - buttonParams.padding,
      ]);
    },
  });
};
