import { StringDictionary } from "../interfaces/interfaces";
import StateManage from "../state/stateManage";
import Flashcard, {
  backgroundCard,
  flashcardsContainer,
} from "../components/Flashcard";
import TypeAnswer from "../components/TypeAnswerFeature";
import { initialQuestionsAndAnswers } from "./staticData";

export async function evaluateUserAnswer(
  question: string,
  answer: string
): Promise<void> {
  if (!TypeAnswer.validateTextarea(question)) {
    return;
  }

  StateManage.toggleTypeAnswerState();

  TypeAnswer.setReadOnlyTextarea();

  const instructions = `Question: ${question}
  User Answer: ${TypeAnswer.textarea!.value}.
  
  - If the users answer is semi-true to the actual answer - (${answer}), label it as "Correct" if it it's not, label it as "Incorrect", and elaborate further with additional information and facts, based on the true answer: ${answer}!

  Start the sentence with "Correct" or "Incorrect"!
  
  `;

  const request = await fetch(
    "https://api.openai.com/v1/engines/text-davinci-003/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify({
        prompt: instructions,
        temperature: 0.3,
        frequency_penalty: 0.6,
        presence_penalty: 0.2,
        max_tokens: 70,
      }),
    }
  );

  const response = await request.json();
  TypeAnswer.textarea!.value = response.choices[0].text.trim();
}

export let questionsAndAnswers: StringDictionary[];

export async function fetchQuestions(category?: string): Promise<void> {
  flashcardsContainer.removeChildren();
  flashcardsContainer.addChildAt(backgroundCard, 0);

  if (category) {
    const baseUrl: string = "https://api.api-ninjas.com/v1/trivia?";
    const limit: number = 30; // 30 is max amount that the  API allows;
    const response = (await fetch(
      `${baseUrl}category=${category}&limit=${limit}`,
      {
        method: "GET",
        headers: { "X-Api-Key": "GF9FKLuCyswhOnYHa77jAA==JBZTSPyKZviECW9D" },
      }
    )) as Response;

    const result = await response.json();

    const filteredQuestionsByLength = result.filter(
      (e: StringDictionary) => e.question.length <= 240
    );

    questionsAndAnswers = filteredQuestionsByLength;
  } else {
    questionsAndAnswers = initialQuestionsAndAnswers;
  }

  const { question, answer } = questionsAndAnswers[0];
  new Flashcard(question, answer);

  new Flashcard(
    "Knock-Knock",
    `Quiz category - (${
      category ||
      "No category chosen yet. Here are some initial questions you might like"
    }). Press any of the buttons below to start the quiz :)`
  );
}
