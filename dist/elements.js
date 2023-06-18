import { Container, Graphics, Text } from "pixi.js";
import { colors } from "./globals";
import flashcards from "./flashcardsData";
import { Flashcard, app, cardParams } from "./index";
const buttonParams = {
    width: 120,
    height: 45,
};
const btnLabelConfig = {
    fill: colors.btnColor,
    fontSize: 14,
};
export class Navigation extends Flashcard {
    constructor() {
        super();
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
        this.prevBtnLabel = new Text("Previous Card", btnLabelConfig);
        this.nextBtnLabel = new Text("Next Card", btnLabelConfig);
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
        this.prevBtn.interactive = true;
        this.nextBtn.interactive = true;
        this.prevBtn.cursor = "pointer";
        this.nextBtn.cursor = "pointer";
        this.prevBtn.on("click", this.prevQuestion, this);
        this.nextBtn.on("click", this.nextQuestion, this);
        this.prevBtn.on("pointerover", this.onButtonHover.bind(this, this.prevBtn, true));
        this.prevBtn.on("pointerout", this.onButtonHover.bind(this, this.prevBtn, false));
        this.nextBtn.on("pointerover", this.onButtonHover.bind(this, this.nextBtn, true));
        this.nextBtn.on("pointerout", this.onButtonHover.bind(this, this.nextBtn, false));
        app.stage.addChild(this.navigation);
    }
    onButtonHover(button, isHovered) {
        button.beginFill(isHovered ? colors.btnHoverColor : colors.btnColor);
        button.drawRoundedRect(0, 0, buttonParams.width, buttonParams.height, 5);
    }
}
//# sourceMappingURL=elements.js.map