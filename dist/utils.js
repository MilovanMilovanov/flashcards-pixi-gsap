export default class Utils {
    static positionToCenter(container, cardParams) {
        const setPosition = () => {
            const xPosition = window.innerWidth / 2 - cardParams.width / 2;
            const yPosition = window.innerHeight / 2 - cardParams.height / 2;
            container.position.set(xPosition, yPosition);
        };
        setPosition();
        window.addEventListener("resize", setPosition);
    }
    static addButtonEvents(prevBtn, nextBtn, prevQuestion, nextQuestion, onButtonHover) {
        prevBtn.on("click", prevQuestion);
        nextBtn.on("click", nextQuestion);
        prevBtn.on("pointerover", onButtonHover.bind(this, prevBtn, true));
        prevBtn.on("pointerout", onButtonHover.bind(this, prevBtn, false));
        nextBtn.on("pointerover", onButtonHover.bind(this, nextBtn, true));
        nextBtn.on("pointerout", onButtonHover.bind(this, nextBtn, false));
    }
}
//# sourceMappingURL=utils.js.map