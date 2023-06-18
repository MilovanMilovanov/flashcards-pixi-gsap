import { Container, Graphics, Text } from "pixi.js";
import { gsap } from "gsap";
import { colors } from "./globals";
import { app } from "./index";
import { textConfig, cardParams } from "./elementsConfig";
import Utils from "./utils";
export default class Flashcard {
    constructor(question, answer) {
        this.renderCard = () => {
            this.card
                .beginFill(this.isFlipped ? colors.cardBackColor : colors.cardFronColor)
                .drawRoundedRect(0, 0, cardParams.width, cardParams.height, cardParams.radius);
        };
        this.flip = () => {
            const flipDuration = 1;
            if (this.isFlipped) {
                gsap.to(this.answerText, { alpha: 0, duration: flipDuration });
                gsap.to(this.questionText, { alpha: 1, duration: flipDuration });
            }
            else {
                gsap.to(this.answerText, { alpha: 1, duration: flipDuration });
                gsap.to(this.questionText, { alpha: 0, duration: flipDuration });
            }
            this.card.position.set(cardParams.width / 2, cardParams.width - 75);
            this.card.pivot.set(cardParams.width / 2, cardParams.height / 2);
            gsap.to(this.card.scale, {
                duration: flipDuration / 2,
                x: 0,
                y: 1.2,
                onUpdate: () => {
                    if (this.card.scale.x == 0)
                        this.renderCard();
                },
                onComplete: () => {
                    gsap.to(this.card.scale, { duration: flipDuration / 2, x: 1, y: 1 });
                },
            });
            this.card.endFill();
            this.isFlipped = !this.isFlipped;
        };
        this.isFlipped = false;
        this.container = new Container();
        this.card = new Graphics();
        this.questionText = new Text(question || "Knock-knock", textConfig);
        this.answerText = new Text(answer || "It's me :)", textConfig);
        this.renderCard();
        this.card.addChild(this.questionText, this.answerText);
        this.questionText.anchor.set(0.5);
        this.answerText.anchor.set(0.5);
        this.questionText.alpha = 1;
        this.answerText.alpha = 0;
        const textPadding = 10;
        this.questionText.position.set(cardParams.width / 2, cardParams.height / 2 - textPadding);
        this.answerText.position.set(cardParams.width / 2, cardParams.height / 2 + textPadding);
        this.container.addChild(this.card);
        this.container.eventMode = "dynamic";
        this.container.cursor = "pointer";
        this.container.on("click", this.flip, this);
        app.stage.addChild(this.container);
        console.log(2);
        Utils.positionToCenter(this.container, cardParams);
    }
}
//# sourceMappingURL=Flashcard.js.map