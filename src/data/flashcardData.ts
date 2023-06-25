import Flashcard, { flashcardsContainer } from "../components/Flashcard";
import { StringDictionary } from "../interfaces/interfaces";

export const categories: string[] = [
  "select category",
  "artliterature",
  "language",
  "sciencenature",
  "general",
  "fooddrink",
  "peopleplaces",
  "geography",
  "historyholidays",
  "entertainment",
  "toysgames",
  "music",
  "mathematics",
  "religionmythology",
  "sportsleisure",
];

export let questionsAndAnswers: StringDictionary[] = [
  {
    question: "what is the 50th state of the united states?",
    answer: "Hawaii",
  },
  {
    question: "What is the loudest animal in the world?",
    answer: "the sperm whale",
  },
  {
    question: "Which is the smallest country in the world?",
    answer: "Vatican",
  },
  {
    question: "What is the biggest organ in the human body?",
    answer: "the skin",
  },
  {
    question: "How many capitals did Bulgaria had through it's history?",
    answer: "12",
  },
  {
    question: "How many colors form the rainbow?",
    answer: "seven",
  },
  {
    question: "What is the color of the sun?",
    answer: "white",
  },
];

export async function fetchQuestions(category?: any): Promise<void> {
  flashcardsContainer.removeChildren();

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

    questionsAndAnswers = result;
  }

  for (const { question, answer } of questionsAndAnswers) {
    new Flashcard(question, answer);
  }

  new Flashcard(
    "Knock-knock",
    `Quiz category - (${
      category ||
      "No category chosen yet. Here are some initial questions you might like"
    }). Press any of the buttons below to start the quiz :)`
  );
}
