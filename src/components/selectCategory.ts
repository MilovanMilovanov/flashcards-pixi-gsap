import { Container, Graphics, Text } from "pixi.js";
import { gsap } from "gsap";
import { app, gameContainer } from "../app";
import { dropDownConfig } from "../config/elementsConfig";
import { categories } from "../data/flashcardData";
import { colors } from "../utils/globals";
import { NoParamsVoidFunction } from "../interfaces/interfaces";
import Utils from "../utils/utils";

export default class SelectCategory {
  dropdown: Container;
  options: Graphics[];
  offsetY: number;
  isExpanded: boolean;

  constructor() {
    this.dropdown = new Container();
    this.options = [];
    this.offsetY = 30;
    this.isExpanded = false;

    this.dropdown.position.set(0, -85);

    categories.forEach((category, index) => {
      const [option, label] = this.createOption(category, index);

      Utils.addDropdownEventListeners(
        category,
        option,
        label,
        index,
        this.renderOption.bind(this),
        this.showOptions.bind(this)
      );

      this.options.push(option);
      this.dropdown.addChild(option);
    });

    app.stage.addChild(this.dropdown);
    gameContainer.addChild(this.dropdown);
  }

  renderOption(option: Graphics, index: number, isHovered: boolean): void {
    option
      .clear()
      .beginFill(isHovered ? colors.selectMenuHover : colors.cardFront)
      .drawRoundedRect(
        0,
        index! * this.offsetY,
        dropDownConfig.width,
        dropDownConfig.height,
        0
      );
  }

  createOption(category: string, index: number): any[] {
    const label = new Text(category, dropDownConfig);
    const option = new Graphics();
    option.addChild(label);

    if (index === 0) {
      option.alpha = 1;
      Utils.manageEventModeAndCursor([option], "add event");
    } else {
      option.alpha = 0;
    }

    this.renderOption(option, index, false);

    label.position.set(15, index * this.offsetY);

    return [option, label];
  }

  showOptions: NoParamsVoidFunction = (): void => {
    this.options.forEach((option, index) => {
      if (this.isExpanded && !(index === 0)) {
        gsap.to(option, { duration: 0.1, y: 0, alpha: 0 });
        Utils.manageEventModeAndCursor([option], "remove event");
      } else {
        gsap.to(option, {
          duration: 0.1,
          y: 1,
          alpha: 1,
        });
        Utils.manageEventModeAndCursor([option], "add event");
      }
    });

    this.isExpanded = !this.isExpanded;
  };
}
