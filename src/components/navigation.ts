import { Container, Graphics, Text } from "pixi.js";
import { colors } from "../utils/globals";
import { gameContainer } from "../app";
import { ButtonHover, NoParamsVoidFunction } from "../interfaces/interfaces";
import { labelConfig, buttonParams } from "../config/elementsConfig";
import { questionsAndAnswers } from "../data/flashcardData";
import Flashcard from "./Flashcard";
import Utils from "../utils/utils";
import CardState from "../state/stateManage";

export default class Navigation {
  navigation: Container;
  prevBtn: Graphics;
  nextBtn: Graphics;
  prevBtnLabel: Text;
  nextBtnLabel: Text;
  prevBtnSide: Graphics;
  nextBtnSide: Graphics;

  constructor() {
    this.navigation = new Container();
    this.prevBtn = new Graphics();
    this.nextBtn = new Graphics();
    this.prevBtnSide = new Graphics();
    this.nextBtnSide = new Graphics();
    this.prevBtnLabel = new Text("Prev Card", labelConfig);
    this.nextBtnLabel = new Text("Next Card", labelConfig);

    this.renderAndPositionButtons();

    this.navigation.addChild(this.prevBtn, this.nextBtn);

    gameContainer.addChild(this.navigation);

    Utils.manageEventModeAndCursor([this.prevBtn, this.nextBtn], "add event");
    Utils.addButtonEventListeners(
      this.prevBtn,
      this.nextBtn,
      this.prevBtnSide,
      this.nextBtnSide,
      this.prevBtnLabel,
      this.nextBtnLabel,
      this.prevQuestion,
      this.nextQuestion,
      this.onButtonHover
    );
  }

  private renderAndPositionButtons: NoParamsVoidFunction = (): void => {
    const buttonData = [
      {
        btn: this.prevBtn,
        label: this.prevBtnLabel,
        position: { x: 0, y: 380 },
        buttonSide: this.prevBtnSide,
      },
      {
        btn: this.nextBtn,
        label: this.nextBtnLabel,
        position: { x: 130, y: 380 },
        buttonSide: this.nextBtnSide,
      },
    ];

    buttonData.forEach(({ btn, label, position, buttonSide }, index) => {
      btn.beginFill(colors.button);
      btn.drawRoundedRect(0, 0, buttonParams.width, buttonParams.height, 3);
      buttonSide.beginFill(colors.buttonSide);
      buttonSide.drawPolygon([
        index === 0 ? 15 : -15,
        0,
        0,
        0,
        0,
        buttonParams.height - buttonParams.padding,
      ]);

      if (index === 0) buttonSide.position.set(0, 0);
      else buttonSide.position.set(buttonParams.width, 0);

      btn.position.set(position.x, position.y);
      label.anchor.set(0.5);
      label.position.set(buttonParams.width / 2, buttonParams.height / 2);

      label.style.dropShadow = true;
      label.style.dropShadowAlpha = 0.2;

      btn.addChild(buttonSide, label);
    });
  };

  private onButtonHover: ButtonHover = (
    button: Graphics,
    buttonSide: Graphics,
    label: Text,
    isHovered: boolean
  ): void => {
    buttonSide.drawPolygon([
      label.text === "Prev Card" ? 15 : -15,
      0,
      0,
      -5,
      0,
      buttonParams.height - buttonParams.padding,
    ]);

    button.tint = isHovered ? colors.buttonTintHover : colors.buttonSide;
    buttonSide.tint = isHovered
      ? colors.buttonSideTintHover
      : colors.buttonSide;
    label.style.fill = isHovered ? colors.buttonLabelHover : colors.buttonLabel;
    button.beginFill(isHovered ? colors.button : colors.button);
    button.drawRoundedRect(0, 0, buttonParams.width, buttonParams.height, 5);
  };

  private setFlashcardData = (index: number): void => {
    const flashcard = questionsAndAnswers[index];
    Flashcard._questionText.text = flashcard.question;
    Flashcard._answerText.text = flashcard.answer;
    Flashcard._questionText.alpha = 1;
    Flashcard._answerText.alpha = 0;
    CardState.resetState();
    Flashcard.renderCard();
  };

  private getCurrentQuestionIndex = (): number => {
    return questionsAndAnswers.findIndex(
      (card) => card.question === Flashcard._questionText.text
    );
  };

  private prevQuestion: NoParamsVoidFunction = (): void => {
    const prevIndex =
      (this.getCurrentQuestionIndex() - 1 + questionsAndAnswers.length) %
      questionsAndAnswers.length;
    this.setFlashcardData(prevIndex);
  };

  private nextQuestion: NoParamsVoidFunction = (): void => {
    const nextIndex =
      (this.getCurrentQuestionIndex() + 1) % questionsAndAnswers.length;
    this.setFlashcardData(nextIndex);
  };
}
