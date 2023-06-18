import { gsap } from "gsap";
const timing = 1;
export const tl = gsap.timeline({ paused: true });
tl.to(".flashcard", { rotationY: "+=180", duration: timing });
tl.to(".flip-container", { z: 50, duration: timing / 2, yoyo: true, repeat: 1 }, 0);
gsap.set(".flip-container", {
    transformStyle: "preserve-3d",
    transformPerspective: 1000,
});
gsap.set(".flashcard", {
    transformStyle: "preserve-3d",
    transformOrigin: "50% 50% 0",
});
gsap.set(".front", { rotationY: 0 });
gsap.set(".back", { rotationY: 180 });
export default function flipAnimation() {
    gsap.utils.toArray(".flip-container").forEach((flip) => {
        flip.addEventListener("click", () => {
            tl.progress() === 1 ? tl.reverse() : tl.play();
        });
    });
}
//# sourceMappingURL=flipAnimation.js.map