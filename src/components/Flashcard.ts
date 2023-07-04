import { Container, Graphics, Text } from "pixi.js";
import { colors } from "../utils/globals";
import {
  textConfig,
  cardDimensions,
  buttonParams,
} from "../config/elementsConfig";
import Utils from "../utils/utils";
import StateManage from "../state/stateManage";
import { evaluateUserAnswer } from "../data/APIs";
import { flipAnimation } from "../animations/flashcard-animation";
import TypeAnswer from "./TypeAnswerFeature";

export const flashcardsContainer = new Container();
export const backgroundCard = new Graphics()
  .beginFill(colors.backgroundCard)
  .drawRoundedRect(
    0,
    0,
    cardDimensions.width,
    cardDimensions.height,
    cardDimensions.radius
  );

export default class Flashcard {
  private static card: Graphics;
  static questionText: Text;
  static answerText: Text;

  static get _questionText(): Text {
    return Flashcard.questionText;
  }

  static get _answerText(): Text {
    return Flashcard.answerText;
  }

  constructor(question: string, answer: string) {
    Flashcard.card = new Graphics();
    Flashcard.questionText = new Text(question, textConfig);
    Flashcard.answerText = new Text(answer, textConfig);
    Flashcard.questionText.alpha = 1;
    Flashcard.answerText.alpha = 0;
    Flashcard.questionText.anchor.set(0.5);
    Flashcard.answerText.anchor.set(0.5);

    Flashcard.questionText.position.set(
      cardDimensions.width / 2,
      cardDimensions.height / 2 - buttonParams.padding
    );
    Flashcard.answerText.position.set(
      cardDimensions.width / 2,
      cardDimensions.height / 2 + buttonParams.padding
    );

    Flashcard.renderCard();
    Flashcard.card.addChild(Flashcard.questionText, Flashcard.answerText);

    Flashcard.card.on("click", () => {
      if (TypeAnswer.textarea) {
        if (
          TypeAnswer.textarea.value.trim().length ||
          Flashcard.questionText.text === "Knock-Knock"
        ) {
          Flashcard.handleFlip();
        }
      } else Flashcard.handleFlip();
    });

    flashcardsContainer.addChild(Flashcard.card);

    Utils.addEventModeAndCursor([Flashcard.card]);
  }

  static handleFlip = (): void => {
    flipAnimation(
      Flashcard.card,
      Flashcard.questionText,
      Flashcard.answerText,
      Flashcard.renderCard
    );

    evaluateUserAnswer(Flashcard.questionText.text, Flashcard.answerText.text);
  };

  static renderCard = (): any => {
    this.card
      .clear()
      .beginFill(StateManage.isFlipped ? colors.cardBack : colors.cardFront)
      .drawRoundedRect(
        0,
        0,
        cardDimensions.width,
        cardDimensions.height,
        cardDimensions.radius
      );
  };
}
