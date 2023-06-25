import { Container, Graphics, Text } from "pixi.js";
import { gsap } from "gsap";
import { colors } from "../utils/globals";
import { textConfig, cardParams, buttonParams } from "../config/elementsConfig";
import { NoParamsVoidFunction } from "../interfaces/interfaces";
import Utils from "../utils/utils";
import CardState from "../state/stateManage";

export const flashcardsContainer = new Container();

export default class Flashcard {
  private static card: Graphics;
  static questionText: Text;
  static answerText: Text;
  cardContainer: Container;

  static get _questionText(): Text {
    return Flashcard.questionText;
  }

  static get _answerText(): Text {
    return Flashcard.answerText;
  }

  constructor(question: string, answer: string) {
    Flashcard.card = new Graphics();
    this.cardContainer = new Container();
    Flashcard.questionText = new Text(question, textConfig);
    Flashcard.answerText = new Text(answer, textConfig);
    Flashcard.questionText.alpha = 1;
    Flashcard.answerText.alpha = 0;
    Flashcard.questionText.anchor.set(0.5);
    Flashcard.answerText.anchor.set(0.5);

    Flashcard.questionText.position.set(
      cardParams.width / 2,
      cardParams.height / 2 - buttonParams.padding
    );
    Flashcard.answerText.position.set(
      cardParams.width / 2,
      cardParams.height / 2 + buttonParams.padding
    );

    Flashcard.renderCard();
    Flashcard.card.addChild(Flashcard.questionText, Flashcard.answerText);

    this.cardContainer.on("click", () => this.flip());
    this.cardContainer.addChild(Flashcard.card);
    flashcardsContainer.addChild(this.cardContainer);

    Utils.manageEventModeAndCursor([this.cardContainer], "add event");
  }

  static renderCard: NoParamsVoidFunction = (): void => {
    this.card
      .clear()
      .beginFill(CardState.isFlipped ? colors.cardBack : colors.cardFront)
      .drawRoundedRect(
        0,
        0,
        cardParams.width,
        cardParams.height,
        cardParams.radius
      );
  };

  flip: NoParamsVoidFunction = (): void => {
    const flipDuration = 1;

    Flashcard.card.position.set(cardParams.width / 2, cardParams.width - 75);

    Flashcard.card.pivot.set(cardParams.width / 2, cardParams.height / 2);

    gsap.to(Flashcard.card.scale, {
      duration: flipDuration / 2,
      x: 0,
      y: 1.2,
      onUpdate: (): void => {
        if (Flashcard.card.scale.x == 0) {
          if (!CardState.isFlipped) {
            gsap.to(Flashcard.answerText, { alpha: 0, duration: 0 });
            gsap.to(Flashcard.questionText, { alpha: 1, duration: 0 });
          } else {
            gsap.to(Flashcard.answerText, { alpha: 1, duration: 0 });
            gsap.to(Flashcard.questionText, { alpha: 0, duration: 0 });
          }
          Flashcard.renderCard();
        }
      },
      onComplete: (): void => {
        gsap.to(Flashcard.card.scale, {
          duration: flipDuration / 2,
          x: 1,
          y: 1,
        });
      },
    });

    CardState.toggleFlipState();
  };
}
