import { Application, Container } from "pixi.js";
import { colors } from "./utils/globals";
import { fetchQuestions } from "./data/flashcardData";
import { cardParams } from "./config/elementsConfig";
import { flashcardsContainer } from "./components/Flashcard";
import SelectCategory from "./components/selectCategory";
import Utils from "./utils/utils";
import Navigation from "./components/navigation";

export const app = new Application({
  view: document.getElementById("flashcard-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  resizeTo: window,
  backgroundColor: colors.appBackground,
});

export const gameContainer = new Container();
gameContainer.addChild(flashcardsContainer);

Utils.positionToCenter(gameContainer, cardParams);
app.stage.addChild(gameContainer);

new Navigation();
new SelectCategory();

fetchQuestions();
