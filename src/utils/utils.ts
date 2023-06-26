import { Graphics, Text } from "pixi.js";
import { fetchQuestions } from "../data/flashcardData";
import CardState from "../state/stateManage";

let firstOption: Graphics;
let firstOptionLabel: Text;

export default abstract class Utils {
  static positionToCenter(container: any, cardParams: any): void {
    const setPosition = (): void => {
      const xPosition = window.innerWidth / 2 - cardParams.width / 2;
      const yPosition = window.innerHeight / 2 - cardParams.height / 2;
      container.position.set(xPosition, yPosition);
    };
    setPosition();

    window.addEventListener("resize", setPosition);
  }

static addDropdownEventListeners(
    category: string,
    option: Graphics,
    label: Text,
    index: number,
    renderOption: Function,
    toggleDropdown: Function
  ): void {
    if (index === 0) {
      option.on("pointerdown", () => {
        firstOption = option;
        firstOptionLabel = label;
        toggleDropdown();
      });
    } else {
      option.on("pointerdown", () => {
        if (label.text === firstOptionLabel.text) return;
        firstOptionLabel.text = label.text;
        CardState.resetState();
        fetchQuestions(category);
        toggleDropdown();
      });
    }

    option.on("pointerover", () => {
      renderOption(option, index, true);
    });
    option.on("pointerout", () => {
      renderOption(option, index, false);
    });
  }

  static addButtonEventListeners(
    prevBtn: Graphics,
    nextBtn: Graphics,
    prevBtnSide: Graphics,
    nextBtnSide: Graphics,
    prevBtnLabel: Text,
    nextBtnLabel: Text,
    prevQuestion: Function,
    nextQuestion: Function,
    onButtonHover: Function
  ): void {
    prevBtn.on("pointerdown", () => prevQuestion());
    nextBtn.on("pointerdown", () => nextQuestion());
    prevBtn.on("pointerover", () =>
      onButtonHover(prevBtn, prevBtnSide, prevBtnLabel, true)
    );
    prevBtn.on("pointerout", () =>
      onButtonHover(prevBtn, prevBtnSide, prevBtnLabel, false)
    );
    nextBtn.on("pointerover", () =>
      onButtonHover(nextBtn, nextBtnSide, nextBtnLabel, true)
    );
    nextBtn.on("pointerout", () =>
      onButtonHover(nextBtn, nextBtnSide, nextBtnLabel, false)
    );
  }

  static manageEventModeAndCursor(elements: any[], command: string): void {
    elements.forEach((currentElement) => {
      if (command === "add event") {
        currentElement.eventMode = "dynamic";
        currentElement.cursor = "pointer";
      } else {
        currentElement.eventMode = "none";
      }
    });
  }
}
