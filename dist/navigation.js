import { Container, Graphics, Text } from "pixi.js";
import { colors } from "./globals";
import { app } from "./index";
import flashcards from "./flashcardsData";
import { labelConfig, buttonParams, cardParams } from "./elementsConfig";
import Utils from "./utils";
import Flashcard from "./Flashcard";
export default class Navigation extends Flashcard {
    constructor() {
        super();
        this.onButtonHover = (button, isHovered) => {
            button.beginFill(isHovered ? colors.btnHoverColor : colors.btnColor);
            button.drawRoundedRect(0, 0, buttonParams.width, buttonParams.height, 5);
        };
        this.prevQuestion = () => {
            const currentIndex = flashcards.findIndex((flashcard) => flashcard.question === this.questionText.text);
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) {
                prevIndex = flashcards.length - 1;
            }
            const prevFlashcard = flashcards[prevIndex];
            this.questionText.text = prevFlashcard.question;
            this.answerText.text = prevFlashcard.answer;
            this.questionText.alpha = 1;
            this.answerText.alpha = 0;
            this.card.clear();
            this.card.beginFill(0xffffff);
            this.card.drawRoundedRect(0, 0, cardParams.width, cardParams.height, cardParams.radius);
            this.isFlipped = false;
        };
        this.nextQuestion = () => {
            let currentIndex = flashcards.findIndex((flashcard) => flashcard.question === this.questionText.text);
            currentIndex++;
            if (currentIndex >= flashcards.length)
                currentIndex = 0;
            const nextFlashcard = flashcards[currentIndex];
            this.questionText.text = nextFlashcard.question;
            this.answerText.text = nextFlashcard.answer;
            this.questionText.alpha = 1;
            this.answerText.alpha = 0;
            this.card.clear();
            this.card.beginFill(0xffffff);
            this.card.drawRoundedRect(0, 0, cardParams.width, cardParams.height, cardParams.radius);
            this.isFlipped = false;
        };
        this.navigation = new Container();
        this.prevBtn = new Graphics();
        this.nextBtn = new Graphics();
        this.prevBtnLabel = new Text("Previous Card", labelConfig);
        this.nextBtnLabel = new Text("Next Card", labelConfig);
        this.prevBtn
            .beginFill(colors.btnColor)
            .drawRoundedRect(0, 0, buttonParams.width, buttonParams.height, 7);
        this.prevBtn.position.set(0, 380);
        this.prevBtnLabel.anchor.set(0.5);
        this.prevBtnLabel.position.set(buttonParams.width / 2, buttonParams.height / 2);
        this.prevBtn.addChild(this.prevBtnLabel);
        this.nextBtn
            .beginFill(colors.btnColor)
            .drawRoundedRect(0, 0, buttonParams.width, buttonParams.height, 7);
        this.nextBtn.position.set(130, 380);
        this.nextBtnLabel.anchor.set(0.5);
        this.nextBtnLabel.position.set(buttonParams.width / 2, buttonParams.height / 2);
        this.nextBtn.addChild(this.nextBtnLabel);
        this.navigation.addChild(this.prevBtn, this.nextBtn);
        this.prevBtn.eventMode = "dynamic";
        this.nextBtn.eventMode = "dynamic";
        this.prevBtn.cursor = "pointer";
        this.nextBtn.cursor = "pointer";
        console.log(1);
        app.stage.addChild(this.navigation);
        Utils.addButtonEvents(this.prevBtn, this.nextBtn, this.prevQuestion, this.nextQuestion, this.onButtonHover);
        Utils.positionToCenter(this.navigation, cardParams);
    }
}
//# sourceMappingURL=navigation.js.map