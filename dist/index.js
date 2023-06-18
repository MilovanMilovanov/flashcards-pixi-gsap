import { Application } from "pixi.js";
import { colors } from "./globals";
import flashcards from "./flashcardsData";
import Flashcard from "./Flashcard";
import Navigation from "./navigation";
export const app = new Application({
    view: document.getElementById("flashcard-canvas"),
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    resizeTo: window,
    backgroundColor: colors.appBgColor,
});
for (const { question, answer } of flashcards) {
    new Flashcard(question, answer);
}
new Navigation();
//# sourceMappingURL=index.js.map