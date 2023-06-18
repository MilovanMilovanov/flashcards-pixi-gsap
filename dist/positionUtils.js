export class PositionContent {
    static positionToCenter(container, cardParams) {
        const setPosition = () => {
            const xPosition = window.innerWidth / 2 - cardParams.width / 2;
            const yPosition = window.innerHeight / 2 - cardParams.height / 2;
            container.position.set(xPosition, yPosition);
        };
        setPosition();
        window.addEventListener("resize", setPosition);
    }
}
//# sourceMappingURL=positionUtils.js.map