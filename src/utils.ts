export default abstract class Utils {
  static positionToCenter(container: any, cardParams: any): void {
    const setPosition = (): void => {
      const xPosition = window.innerWidth / 2 - cardParams.width / 2;
      const yPosition = window.innerHeight / 2 - cardParams.height / 2;
      container.position.set(xPosition, yPosition);
    };
    setPosition();

    window.addEventListener("resize", setPosition as EventListener);
  }

  static addEventListeners(
    prevBtn: any,
    nextBtn: any,
    prevQuestion: Function,
    nextQuestion: Function,
    onButtonHover: Function
  ): void {
    prevBtn.on("click", prevQuestion);
    nextBtn.on("click", nextQuestion);

    prevBtn.on("pointerover", onButtonHover.bind(this, prevBtn, true));
    prevBtn.on("pointerout", onButtonHover.bind(this, prevBtn, false));
    nextBtn.on("pointerover", onButtonHover.bind(this, nextBtn, true));
    nextBtn.on("pointerout", onButtonHover.bind(this, nextBtn, false));
  }

  static setEventModeAndCursor(
    prevBtn?: any,
    nextBtn?: any,
    container?: any
  ): void {
    if (container) {
      container.eventMode = "dynamic";
      container.cursor = "pointer";
    }

    if (prevBtn) {
      prevBtn.eventMode = "dynamic";
      prevBtn.cursor = "pointer";
    }
    if (nextBtn) {
      nextBtn.eventMode = "dynamic";
      nextBtn.cursor = "pointer";
    }
  }
}
