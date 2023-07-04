import { DisplayObject, Filter } from "pixi.js";
import { cardDimensions } from "../config/elementsConfig";
import {
  ButtonEventListeners,
  DropdownElements,
} from "../interfaces/interfaces";
import { gameContainer } from "../app";
import { flashcardsContainer } from "../components/Flashcard";
import TypeAnswer from "../components/TypeAnswerFeature";

const fragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uBrightness;

void main() {
  vec4 color = texture2D(uSampler, vTextureCoord);
  color.rgb *= uBrightness;
  gl_FragColor = color;
}
`;

export default class Utils {
  constructor() {
    window.addEventListener("resize", () => Utils.layoutHandling());
    Utils.layoutHandling();
  }

  static layoutHandling = (): void => {
    const { innerWidth, innerHeight } = window;
    const xPosition = innerWidth / 2 - cardDimensions.width / 2;
    const yPosition = innerHeight / 2 - cardDimensions.height / 2;
    gameContainer.position.set(xPosition, yPosition);
    flashcardsContainer.position.set(0, 5);

    if (TypeAnswer.textarea && innerWidth >= 600) {
      flashcardsContainer.position.set(cardDimensions.width / 2 + 5, 8);
      TypeAnswer.textarea!.style.top = `${yPosition + 13}`;
      TypeAnswer.textarea!.style.padding = "0";
    }

    if (TypeAnswer.textarea && innerWidth < 600) {
      TypeAnswer.textarea!.style.top = `${
        yPosition + cardDimensions.height + 130
      }`;
      flashcardsContainer.position.set(0, 5);
    }
  };

  static addDropdownEventListeners = (params: DropdownElements): void => {
    const {
      option,
      label,
      currentIndex,
      dropdownName,
      handleDropdownToggle,
      onPointerIn,
      onPointerOut,
    } = params;
    params;

    option.on("pointerdown", () =>
      handleDropdownToggle({ label, currentIndex, dropdownName })
    );
    option.on("pointerover", () => onPointerIn(option, currentIndex));
    option.on("pointerout", () => onPointerOut(option, label, currentIndex));
  };

  static addButtonEventListeners = (params: ButtonEventListeners): void => {
    const { button, buttonSide, label, navigateFunction } = params;

    button.on("pointerdown", () => {
      navigateFunction();
      if (TypeAnswer.textarea) {
        setTimeout(() => TypeAnswer.textarea!.focus());
      }
    });

    button.on("pointerover", () => {
      params.onButtonHover(button, buttonSide, label, true);
    });

    button.on("pointerout", () => {
      params.onButtonHover(button, buttonSide, label, false);
    });
  };

  static addTextAreaEventListeners = (textarea: HTMLTextAreaElement): void => {
    textarea.addEventListener("pointerover", () => {
      textarea.focus();
    });
    textarea.addEventListener("pointerout", () => {
      textarea.blur();
    });
  };

  static addEventModeAndCursor(elements: DisplayObject[]): void {
    elements.forEach((currentElement) => {
      currentElement.eventMode = "dynamic";
      currentElement.cursor = "pointer";
    });
  }

  static setBrightness = (items: DisplayObject[], number: number): void => {
    const brightnessFilter = new Filter(undefined, fragmentShader, {
      uBrightness: number,
    });
    items.forEach((item) => (item.filters = [brightnessFilter]));
  };
}
