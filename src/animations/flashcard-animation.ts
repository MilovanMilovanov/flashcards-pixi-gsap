import { Graphics, Text } from "pixi.js";
import { gsap } from "gsap";
import { cardDimensions } from "../config/elementsConfig";
import StateManage from "../state/stateManage";

export const flipAnimation = (
  card: Graphics,
  question: Text,
  answer: Text,
  renderCard: Function
): void => {
  if (card.scale.x !== 1) return;

  StateManage.toggleFlipState();

  card.position.set(cardDimensions.width / 2, cardDimensions.width - 75);
  card.pivot.set(cardDimensions.width / 2, card.height / 2);

  gsap.to(card.scale, {
    duration: 0.5,
    x: 0,
    y: 1.2,
    onUpdate: (): void => {
      if (card.scale.x == 0) {
        if (!StateManage.isFlipped) {
          gsap.to(answer, { alpha: 0, duration: 0 });
          gsap.to(question, { alpha: 1, duration: 0 });
        } else {
          gsap.to(answer, { alpha: 1, duration: 0 });
          gsap.to(question, { alpha: 0, duration: 0 });
        }
        renderCard();
      }
    },
    onComplete: (): void => {
      gsap.to(card.scale, {
        duration: 0.5,
        x: 1,
        y: 1,
      });
    },
  });
};
