import Utils from "../utils/utils";
import StateManage from "../state/stateManage";
import Flashcard from "./Flashcard";

export default class TypeAnswer {
  static textarea: HTMLTextAreaElement | null = null;

  static validateTextarea = (question: string): boolean | undefined => {
    if (!TypeAnswer.textarea) return;

    if (StateManage.isAnswerRevealed || question === "Knock-Knock") return;

    if (TypeAnswer.textarea!.value.trim() === "") {
      TypeAnswer.enableClearTextarea();
      return;
    }
    return true;
  };

  static activateFeature = (): void => {
    TypeAnswer.textarea = this.createTextarea();
    Utils.addTextAreaEventListeners(TypeAnswer.textarea);

    Flashcard.handleFlip();
    Utils.layoutHandling();

    document.body.prepend(TypeAnswer.textarea);
  };

  static disableFeature = (): void => {
    document.body.removeChild(TypeAnswer.textarea!);
    TypeAnswer.textarea = null;
    Utils.layoutHandling();
    Flashcard.handleFlip();
  };

  static enableClearTextarea = (): void => {
    if (TypeAnswer.textarea) {
      TypeAnswer.textarea.value = "";
      TypeAnswer.textarea.disabled = false;
      TypeAnswer.textarea.readOnly = false;
    }
  };

  static disabledClearTextarea = (): void => {
    if (TypeAnswer.textarea) {
      TypeAnswer.textarea.disabled = true;
      TypeAnswer.textarea.value = "";
    }
  };

  static setReadOnlyTextarea = (): void => {
    TypeAnswer.textarea!.readOnly = true;
  };

  private static createTextarea = (): HTMLTextAreaElement => {
    const element = document.createElement("textarea");
    element.id = "type-answer";
    element.placeholder =
      "Type your answer then tap or click on the flashcard to reveal the correct answer";
    element.disabled = true;
    return element;
  };
}
