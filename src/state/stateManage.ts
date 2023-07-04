enum FlipState {
  NOT_FLIPPED,
  FLIPPED,
}

enum AnswerState {
  NOT_REVEALED,
  REVEALED,
}

export enum FeaturesMenuState {
  NOT_EXPANDED,
  EXPANDED,
}

export enum CategoreisMenuState {
  NOT_EXPANDED,
  EXPANDED,
}

export default abstract class StateManage {
  static isFeatureMenuExpanded: FeaturesMenuState;
  static isCategoriesMenuExpanded: CategoreisMenuState;

  static isFlipped: FlipState = FlipState.NOT_FLIPPED;
  static isAnswerRevealed: AnswerState = AnswerState.NOT_REVEALED;

  static resetState = (): void => {
    this.isFlipped = FlipState.NOT_FLIPPED;
    this.isAnswerRevealed = AnswerState.NOT_REVEALED;
  };
  static toggleFlipState = (): void => {
    this.isFlipped =
      this.isFlipped === FlipState.FLIPPED
        ? FlipState.NOT_FLIPPED
        : FlipState.FLIPPED;
  };

  static toggleTypeAnswerState = (): void => {
    this.isAnswerRevealed =
      this.isAnswerRevealed === AnswerState.REVEALED
        ? AnswerState.NOT_REVEALED
        : AnswerState.REVEALED;
  };

  static toggleFeaturesMenuState = (): void => {
    this.isFeatureMenuExpanded === FeaturesMenuState.EXPANDED
      ? FeaturesMenuState.NOT_EXPANDED
      : FeaturesMenuState.EXPANDED;
  };
  static toggleCategoriesMenuState = (): void => {
    this.isCategoriesMenuExpanded === CategoreisMenuState.EXPANDED
      ? CategoreisMenuState.NOT_EXPANDED
      : CategoreisMenuState.EXPANDED;
  };
}
