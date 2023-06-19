import { Container, Graphics, Text } from "pixi.js";
import { gsap } from "gsap";
import { colors } from "./globals";
import { app } from "./index";
import { textConfig, cardParams, buttonParams } from "./elementsConfig";
import { NoParamsVoidFunction } from "./interfaces";
import Utils from "./utils";

export default class Flashcard {
  container: Container;
  card: Graphics;
  questionText: Text;
  answerText: Text;
  isFlipped: boolean;

  constructor(question?: string, answer?: string) {
    this.isFlipped = false;
    this.container = new Container();
    this.card = new Graphics();
    this.questionText = new Text(question || "Knock-knock", textConfig);
    this.answerText = new Text(answer || "It's me :)", textConfig);

    this.questionText.anchor.set(0.5);
    this.answerText.anchor.set(0.5);
    this.questionText.alpha = 1;
    this.answerText.alpha = 0;

    this.questionText.position.set(
      cardParams.width / 2,
      cardParams.height / 2 - buttonParams.padding
    );
    this.answerText.position.set(
      cardParams.width / 2,
      cardParams.height / 2 + buttonParams.padding
    );

    this.renderCard();
    this.card.addChild(this.questionText, this.answerText);

    this.container.addChild(this.card);
    this.container.on("click", this.flip, this);

    app.stage.addChild(this.container);

    Utils.setEventModeAndCursor(this.container);
    Utils.positionToCenter(this.container, cardParams);
  }

  renderCard: NoParamsVoidFunction = (): void => {
    this.card
      .beginFill(this.isFlipped ? colors.cardBackColor : colors.cardFronColor)
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

    this.card.position.set(cardParams.width / 2, cardParams.width - 75);

    this.card.pivot.set(cardParams.width / 2, cardParams.height / 2);

    gsap.to(this.card.scale, {
      duration: flipDuration / 2,
      x: 0,
      y: 1.2,
      onUpdate: (): void => {
        if (this.card.scale.x == 0) {
          if (!this.isFlipped) {
            gsap.to(this.answerText, { alpha: 0, duration: 0 });
            gsap.to(this.questionText, { alpha: 1, duration: 0 });
          } else {
            gsap.to(this.answerText, { alpha: 1, duration: 0 });
            gsap.to(this.questionText, { alpha: 0, duration: 0 });
          }
          this.renderCard();
        }
      },
      onComplete: (): void => {
        gsap.to(this.card.scale, { duration: flipDuration / 2, x: 1, y: 1 });
      },
    });

    this.isFlipped = !this.isFlipped;
  };
}
