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

  renderAndPositionButtons = (): void => {
    const labels = [this.prevBtnLabel, this.nextBtnLabel];
    [this.prevBtn, this.nextBtn].forEach((btn, index) => {
      btn
        .beginFill(colors.btnColor)
        .drawRoundedRect(0, 0, buttonParams.width, buttonParams.height, 7);
      labels[index].anchor.set(0.5);
      labels[index].position.set(
        buttonParams.width / 2,
        buttonParams.height / 2
      );
      btn.addChild(labels[index]);

      index === 0 ? btn.position.set(0, 380) : btn.position.set(130, 380);
    });
  };

  onButtonHover: ButtonHover = (button: Graphics, isHovered: boolean): void => {
    button.beginFill(isHovered ? colors.btnHoverColor : colors.btnColor);
    button.drawRoundedRect(0, 0, buttonParams.width, buttonParams.height, 5);
  };

  setFlashcardData = (index: number): void => {
    const prevFlashcard = flashcards[index];
    this.questionText.text = prevFlashcard.question;
    this.answerText.text = prevFlashcard.answer;
    this.questionText.alpha = 1;
    this.answerText.alpha = 0;
    this.isFlipped = false;
    this.renderCard();
  };

  prevQuestion: NoParamsVoidFunction = (): void => {
    const currentIndex = flashcards.findIndex(
      (flashcard) => flashcard.question === this.questionText!.text
    ) as number;
    let prevIndex = currentIndex - 1;

    if (prevIndex < 0) {
      prevIndex = flashcards.length - 1;
    }

    this.setFlashcardData(prevIndex);
  };

  nextQuestion: NoParamsVoidFunction = (): void => {
    let currentIndex = flashcards.findIndex(
      (flashcard) => flashcard.question === this.questionText.text
    ) as number;

    currentIndex++;

    if (currentIndex >= flashcards.length) currentIndex = 0;

    this.setFlashcardData(currentIndex);
  };
}
