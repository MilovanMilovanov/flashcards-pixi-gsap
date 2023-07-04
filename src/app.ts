import { Application, Container } from "pixi.js";
import { colors } from "./utils/globals";
import { fetchQuestions } from "./data/APIs";
import { flashcardsContainer } from "./components/Flashcard";
import DropdownController, {
  dropdownMenus,
} from "./components/dropdownController";
import Navigation from "./components/navigation";
import Utils from "./utils/utils";
import { dropdownLists } from "./data/staticData";

export const app = new Application({
  view: document.getElementById("flashcard-canvas")! as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  resizeTo: window,
  backgroundColor: colors.appBackground,
});

export const gameContainer = new Container();

gameContainer.addChild(flashcardsContainer);
app.stage.addChild(gameContainer);

new Utils();

dropdownLists.forEach(({ name, list }: any) => {
  dropdownMenus[name] = new DropdownController(name, list);
});

const buttons: string[] = ["Prev Card", "Next Card"];
buttons.forEach((button) => new Navigation(button));

fetchQuestions();
