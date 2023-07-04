import { Container, Graphics, Text } from "pixi.js";
import { labelConfig, buttonParams } from "../config/elementsConfig";
import { questionsAndAnswers } from "../data/APIs";
import { ButtonEventListeners } from "../interfaces/interfaces";
import { colors } from "../utils/globals";
import Utils from "../utils/utils";
import { buttonAnimation } from "../animations/button-animation";
import { gameContainer } from "../app";
import StateManagement from "../state/stateManage";
import TypeAnswer from "./TypeAnswerFeature";
import Flashcard from "./Flashcard";

export const navigationContainer = new Container();

export default class Navigation {
  currentButton: string;
  button: Graphics = new Graphics();
  buttonSide: Graphics = new Graphics();
  label: Text;

  constructor(currentButton: string) {
    this.currentButton = currentButton;
    this.label = new Text(currentButton, labelConfig);

    Utils.setBrightness([this.label], 0.8);

    this.renderAndPositionButtons();

    navigationContainer.addChild(this.button);

    gameContainer.addChild(navigationContainer);

    Utils.addEventModeAndCursor([this.button]);
    Utils.addButtonEventListeners({
      button: this.button,
      buttonSide: this.buttonSide,
      label: this.label,
      navigateFunction: this.navigateFunction,
      onButtonHover: this.onButtonHover,
    });
  }

  private renderAndPositionButtons = (): void => {
    this.button
      .beginFill(colors.button)
      .drawRoundedRect(0, 0, buttonParams.width, buttonParams.height, 3);
    this.buttonSide
      .beginFill(colors.buttonSide)
      .drawPolygon([
        this.currentButton === "Prev Card" ? 15 : -15,
        0,
        0,
        0,
        0,
        buttonParams.height - buttonParams.padding,
      ]);

    if (this.currentButton === "Prev Card") {
      this.button.position.set(0, 395);
      this.buttonSide.position.set(0, 0);
    }
    if (this.currentButton === "Next Card") {
      this.button.position.set(130, 395);
      this.buttonSide.position.set(buttonParams.width, 0);
    }

    this.label.anchor.set(0.5);
    this.label.position.set(buttonParams.width / 2, buttonParams.height / 2);
    this.label.style.dropShadow = true;
    this.label.style.dropShadowAlpha = 0.2;

    this.button.addChild(this.buttonSide, this.label);
  };

  private onButtonHover: Pick<
    ButtonEventListeners,
    "onButtonHover"
  >["onButtonHover"] = (
    button: Graphics,
    buttonSide: Graphics,
    label: Text,
    isHovered: boolean
  ): void => {
    button.tint = isHovered ? colors.buttonTintHover : colors.buttonSide;
    buttonSide.tint = colors.buttonSideHover;
    isHovered
      ? Utils.setBrightness([label], 1.5)
      : Utils.setBrightness([label], 0.9);
    buttonAnimation(buttonSide, label, isHovered);
  };

  private setFlashcardData = (index: number): void => {
    const flashcard = questionsAndAnswers[index];
    Flashcard.questionText.text = flashcard.question;
    Flashcard.answerText.text = flashcard.answer;
    Flashcard.questionText.alpha = 1;
    Flashcard.answerText.alpha = 0;
    StateManagement.resetState();
    TypeAnswer.enableClearTextarea();
    Flashcard.renderCard();
  };

  private getCurrentQuestionIndex = (): number => {
    return questionsAndAnswers.findIndex(
      (card) => card.question === Flashcard.questionText.text
    );
  };

  private navigateFunction = (): void => {
    if (this.currentButton === "Prev Card") {
      const prevIndex =
        (this.getCurrentQuestionIndex() - 1 + questionsAndAnswers.length) %
        questionsAndAnswers.length;
      this.setFlashcardData(prevIndex);
    }

    if (this.currentButton === "Next Card") {
      const nextIndex =
        (this.getCurrentQuestionIndex() + 1) % questionsAndAnswers.length;
      this.setFlashcardData(nextIndex);
    }
  };
}
