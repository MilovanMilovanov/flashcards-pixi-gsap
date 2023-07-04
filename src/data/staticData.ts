import { DropdownLists, StringDictionary } from "../interfaces/interfaces";

export const featuresList: DropdownLists = {
  name: "features",
  list: ["select feature", "type answer"],
};

export const categoriesList: DropdownLists = {
  name: "categories",
  list: [
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
  ],
};

export const dropdownLists: DropdownLists[] = [categoriesList, featuresList];

export const initialQuestionsAndAnswers: StringDictionary[] = [
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
