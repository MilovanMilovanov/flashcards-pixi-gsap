import { Container, Graphics, Text } from "pixi.js";
import { dropDownConfig } from "../config/elementsConfig";
import { featuresList, categoriesList } from "../data/staticData";
import { fetchQuestions } from "../data/APIs";
import { colors } from "../utils/globals";
import Utils from "../utils/utils";
import { DropdownElements, DropdownMenu } from "../interfaces/interfaces";
import dropdownAnimation from "../animations/dropdown-animation.";
import { gameContainer } from "../app";
import TypeAnswer from "./TypeAnswerFeature";
import StateManage from "../state/stateManage";
import Flashcard from "./Flashcard";

export const dropdownsContainer = new Container();

export const dropdownMenus: DropdownMenu = {};

export default class DropdownController {
  dropdown: Container = new Container();
  options: Graphics[] = [];
  isExpanded: boolean = false;
  offsetY: number = 30;
  initialLabel: Text;

  constructor(dropdownName: string, dropdownList: string[]) {
    if (dropdownName === "features") {
      this.dropdown.position.set(0, -115);
    }

    if (dropdownName === "categories") {
      this.dropdown.position.set(0, -55);
    }

    this.createDropdownItems(
      dropdownList,
      this.dropdown,
      this.options,
      dropdownName
    );

    this.initialLabel = this.options[0].children[0] as Text;

    dropdownsContainer.addChild(this.dropdown);
    gameContainer.addChild(dropdownsContainer);
  }

  createDropdownItems = (
    categories: string[],
    container: Container,
    options: Graphics[],
    dropdownName: string
  ): void => {
    categories.forEach((category, currentIndex) => {
      const option = new Graphics();
      const label = new Text(category, dropDownConfig);
      label.position.set(15, currentIndex * this.offsetY);
      option.addChild(label);

      if (currentIndex > 0) option.visible = false;

      this.renderOption(option, currentIndex, false);

      Utils.addEventModeAndCursor([option]);
      Utils.addDropdownEventListeners({
        option,
        label,
        currentIndex,
        dropdownName,
        handleDropdownToggle: this.handleDropdownToggle,
        onPointerIn: this.onPointerIn,
        onPointerOut: this.onPointerOut,
      });

      options.push(option);
      container.addChild(option);
    });
  };

  renderOption = (
    option: Graphics,
    index: number,
    isHovered: boolean
  ): void => {
    option
      .clear()
      .beginFill(isHovered ? colors.selectMenuHover : colors.cardFront)
      .drawRoundedRect(
        0,
        index * this.offsetY,
        dropDownConfig.width,
        dropDownConfig.height,
        0
      );
  };

  toggleDropdown = (dropdownName?: string): void => {
    if (dropdownName === featuresList.name) {
      dropdownMenus.categories.isExpanded = true;
      dropdownMenus.categories.toggleDropdown();
    }

    if (dropdownName === categoriesList.name) {
      dropdownMenus.features.isExpanded = true;
      dropdownMenus.features.toggleDropdown();
    }

    this.options.forEach((option, index) => {
      dropdownAnimation(option, index, this.isExpanded);
    });

    this.isExpanded = !this.isExpanded;
    StateManage.resetState();
  };

  handleDropdownToggle = (data: DropdownElements): void => {
    const { label, currentIndex, dropdownName } = data;

    if (currentIndex > 0) {
      if (TypeAnswer.textarea && label.text === "type answer") {
        this.initialLabel.text = featuresList.list[0];
        TypeAnswer.disableFeature();
        return this.toggleDropdown();
      }

      if (label.text === "type answer") TypeAnswer.activateFeature();
      StateManage.resetState();

      if (label.text === this.initialLabel.text) return;

      if (dropdownName === categoriesList.name) fetchQuestions(label.text);

      this.options.forEach((option, index) => {
        currentIndex !== index ? this.renderOption(option, index, false) : null;
      });

      this.initialLabel.text = label.text;

      return this.toggleDropdown();
    }

    if (!this.isExpanded || Flashcard.questionText.text === "Knock-Knock")
      TypeAnswer.disabledClearTextarea();
    else TypeAnswer.enableClearTextarea();

    this.toggleDropdown(dropdownName);
  };

  onPointerIn = (option: Graphics, index: number): void => {
    this.renderOption(option, index, true);
  };

  onPointerOut = (option: Graphics, label: Text, index: number): void => {
    if (this.initialLabel.text !== label.text || index === 0) {
      this.renderOption(option, index, false);
    }
  };
}
