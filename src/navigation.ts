import { Container, Graphics, Text } from "pixi.js";
import { colors } from "./globals";
import { app } from "./index";
import { ButtonHover, NoParamsVoidFunction } from "./interfaces";
import { labelConfig, buttonParams, cardParams } from "./elementsConfig";
import Flashcard from "./Flashcard";
import flashcards from "./flashcardsData";
import Utils from "./utils";

export default class Navigation extends Flashcard {
  navigation: Container;
  prevBtn: Graphics;
  nextBtn: Graphics;
  prevBtnLabel: Text;
  nextBtnLabel: Text;

  constructor() {
    super();
    this.navigation = new Container();
    this.prevBtn = new Graphics();
    this.nextBtn = new Graphics();
    this.prevBtnLabel = new Text("Previous Card", labelConfig);
    this.nextBtnLabel = new Text("Next Card", labelConfig);

    this.renderAndPositionButtons();

    this.navigation.addChild(this.prevBtn, this.nextBtn);

    app.stage.addChild(this.navigation);

    Utils.setEventModeAndCursor(this.prevBtn, this.nextBtn);
    Utils.addEventListeners(
      this.prevBtn,
      this.nextBtn,
      this.prevQuestion,
      this.nextQuestion,
      this.onButtonHover
    );
    Utils.positionToCenter(this.navigation, cardParams);
  }

  private renderAndPositionButtons: NoParamsVoidFunction = (): void => {
    const buttonData = [
      {
        btn: this.prevBtn,
        label: this.prevBtnLabel,
        position: { x: 0, y: 380 },
      },
      {
        btn: this.nextBtn,
        label: this.nextBtnLabel,
        position: { x: 130, y: 380 },
      },
    ];

    buttonData.forEach(({ btn, label, position }) => {
      this.renderButton(btn, label);
      this.positionButton(btn, position);
      this.positionButtonLabel(label);
    });
  };

  private renderButton(btn: Graphics, label: Text): void {
    btn
      .beginFill(colors.btnColor)
      .drawRoundedRect(0, 0, buttonParams.width, buttonParams.height, 7);
    btn.addChild(label);
  }

  private positionButton(
    btn: Container,
    position: { x: number; y: number }
  ): void {
    btn.position.set(position.x, position.y);
  }

  private onButtonHover: ButtonHover = (
    button: Graphics,
    isHovered: boolean
  ): void => {
    button.beginFill(isHovered ? colors.btnHoverColor : colors.btnColor);
    button.drawRoundedRect(0, 0, buttonParams.width, buttonParams.height, 5);
  };

  private positionButtonLabel(label: Text): void {
    label.anchor.set(0.5);
    label.position.set(buttonParams.width / 2, buttonParams.height / 2);
  }

  private setFlashcardData = (index: number): void => {
    const flashcard = flashcards[index];
    this.updateFlashcardData(flashcard);
  };

  private updateFlashcardData(flashcard: any): void {
    this.setQuestionText(flashcard.question);
    this.setAnswerText(flashcard.answer);
    this.setCardTextVisibility(true, false);
    this.isFlipped = false;
    this.renderCard();
  }

  private setQuestionText(text: string): void {
    this.questionText.text = text;
  }

  private setAnswerText(text: string): void {
    this.answerText.text = text;
  }

  private setCardTextVisibility(
    questionVisible: boolean,
    answerVisible: boolean
  ): void {
    this.questionText.alpha = questionVisible ? 1 : 0;
    this.answerText.alpha = answerVisible ? 1 : 0;
  }

  private getCurrentQuestionIndex = (): number => {
    return flashcards.findIndex(
      (card) => card.question === this.questionText.text
    );
  };

  private prevQuestion: NoParamsVoidFunction = (): void => {
    const prevIndex =
      (this.getCurrentQuestionIndex() - 1 + flashcards.length) %
      flashcards.length;
    this.setFlashcardData(prevIndex);
  };

  private nextQuestion: NoParamsVoidFunction = (): void => {
    const nextIndex = (this.getCurrentQuestionIndex() + 1) % flashcards.length;
    this.setFlashcardData(nextIndex);
  };
}
