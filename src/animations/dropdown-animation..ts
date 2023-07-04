import { Graphics } from "pixi.js";
import { gsap } from "gsap";

export default function dropdownAnimation(
  option: Graphics,
  index: number,
  state: boolean
) {
  if (state && index > 0) {
    option.visible = false;
    gsap.to(option, {
      y: 100,
      duration: 0.2,
    });
  } else {
    option.visible = true;
    gsap.to(option, {
      y: 0,
      duration: 0.2,
    });
  }
}
