# flashcards-pixi-gsap

I have created a Flashcard class that represents a single flashcard within an application. Each flashcard has a container, a card, question text, answer text, and a boolean flag indicating whether it is currently flipped or not.

When a new instance of the Flashcard class is created, it initializes the necessary PIXI.js objects, such as the container, card, and text elements, and sets their initial properties. The question and answer texts can be provided as optional parameters during instantiation.

The renderCard method is responsible for drawing the card based on its current state (flipped or not) and the defined color constants.

The flip method is called when the flashcard is clicked. It uses the GSAP library to animate the flip effect by adjusting the alpha values of the question and answer texts. It also adjusts the position and scale of the card to create a visually appealing animation. Finally, it updates the isFlipped flag accordingly.

To control the event mode and cursor of the flashcard, the setEventModeAndCursor static method is implemented in the Utils class. It takes in the previous button, next button, and container objects as optional parameters. If a container object is provided, it sets the event mode and cursor properties on the container. Otherwise, it sets these properties on the previous and next buttons individually.

Overall, the flashcard runs within a PIXI.js application. Multiple flashcards can be instantiated and added to the stage. Each flashcard can be clicked to trigger the flip effect, toggling between the question and answer sides. The setEventModeAndCursor method ensures consistent event handling and cursor styles for the flashcards or specific elements within them.
