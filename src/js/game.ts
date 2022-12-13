import {Clock} from "./clock";

const getNewTime = (): [number, number, number] => {
  const min = Math.floor(Math.random() * 12) * 5;
  const hour = 1 + Math.floor(Math.random() * 12);
  const sec = Math.floor(Math.random() * 60);
  return [hour, min, sec];
}

const td = (n: number): string => n > 9 ? `${n}` : `0${n}`;


class Answer {
  hour: number;
  min: number;
}

class Question {

  hour: number;
  min: number;
  isAnswered: boolean;
  isCorrect: boolean;
  answer: Answer;

  constructor() {
    const [hour, min] = getNewTime();
    this.hour = hour;
    this.min = min;
    this.isAnswered = false;
    this.isCorrect = false;
    this.answer = new Answer();

  }
}

export class Game {
  clock: Clock;
  gameNode: HTMLElement;
  answerContainerNode: HTMLElement;
  answerHourNode: HTMLInputElement;
  answerMinuteNode: HTMLInputElement;
  submitButtonNode: HTMLButtonElement;
  newQuestionNode: HTMLButtonElement;
  resultsNode: HTMLElement;

  question: Question;

  constructor(clock: Clock) {
    this.clock = clock;
    this.setupDom();
  }

  private setupDom() {
    this.gameNode = document.getElementById("game");
    this.answerContainerNode = <HTMLInputElement>document.getElementById("answer-container");

    this.answerHourNode = <HTMLInputElement>document.getElementById("hour-answer");
    this.answerMinuteNode = <HTMLInputElement>document.getElementById("minute-answer");
    this.submitButtonNode = <HTMLButtonElement>document.getElementById("submit-answer");
    this.newQuestionNode = <HTMLButtonElement>document.getElementById("new-question");
    this.resultsNode = document.getElementById("results");

    this.submitButtonNode.addEventListener('click', () => {
      this.checkAnswer();
    })

    this.newQuestionNode.addEventListener('click', () => {
      this.newQuestion();
    })

  }

  start() {
    this.gameNode.classList.remove('hidden');
    this.newQuestion();
  }

  stop() {
    this.gameNode.classList.add('hidden');
  }

  newQuestion() {
    this.question = new Question();
    console.log(this.question)
    this.clock.showTime(this.question.hour, this.question.min).hideSeconds();
    this.reset();
  }

  reset() {
    this.submitButtonNode.classList.remove('hidden');
    this.newQuestionNode.classList.add('hidden');
    this.clearResults();
    this.answerHourNode.value = "0";
    this.answerMinuteNode.value = "0";
    this.answerHourNode.removeAttribute('disabled');
    this.answerMinuteNode.removeAttribute('disabled');

  }

  checkAnswer() {
    const hour = +this.answerHourNode.value;
    const min = +this.answerMinuteNode.value;
    console.log(`${hour}:${min}`);

    let errors = this.validateAnswer(hour, min);
    if (errors) {
      return
    }

    const messages = [];

    this.answerHourNode.setAttribute('disabled', 'true');
    this.answerMinuteNode.setAttribute('disabled', 'true');

    this.question.answer.hour = hour;
    this.question.answer.min = min;
    this.question.isAnswered = true;

    if (this.question.hour !== this.question.answer.hour
      || this.question.min !== this.question.answer.min) {
      messages.push(`<div class="icon">😿<div>`);
      messages.push(`Oh no! The time is ${this.question.hour}: ${td(this.question.min)}`)
      messages.push(`But you have entered ${hour}: ${td(min)}`)

      this.setResults(messages, "invalid");
      this.question.isCorrect = false;
    } else {
      messages.push(`<div class="icon">😸<div>`);
      messages.push(`<div>Yeeee!! You have entered the correct time!! ${hour}: ${td(min)}</div>`)
      messages.push(`<div class="icon">🌟</div>`)

      this.setResults(messages, "success");
      this.question.isCorrect = true;
    }

    this.submitButtonNode.classList.add('hidden');
    this.newQuestionNode.classList.remove('hidden');

  }

  validateAnswer(hour: number, min: number): string[] | number {

    const messages: string[] = [];
    let hasError = false;
    this.answerHourNode.classList.remove('invalid');
    this.answerMinuteNode.classList.remove('invalid');
    if (hour <= 0 || hour > 12) {
      this.answerHourNode.classList.add('invalid');
      messages.push("Hour has to between 1 and 12")
      hasError = true;
    }

    if (min < 0 || min > 60) {
      this.answerMinuteNode.classList.add('invalid');
      messages.push("Minutes has to between 0 and 60")
      hasError = true;
    }

    if (hasError) {
      this.setResults(messages, "invalid");
      return messages;
    } else {
      return null;
    }
  }

  setResults(messages: string[] = [], type = "") {

    this.clearResults();

    if (messages.length === 0) {
      return;
    }

    this.resultsNode.classList.remove('hidden');
    this.resultsNode.classList.add(type);

    messages.forEach(message => {
      const messageNode = document.createElement("div")
      messageNode.classList.add('message');
      messageNode.innerHTML = message;
      this.resultsNode.appendChild(messageNode);
    })

  }

  clearResults() {
    this.resultsNode.classList.remove('success');
    this.resultsNode.classList.remove('invalid');
    this.resultsNode.classList.add('hidden');
    this.resultsNode.childNodes.forEach(child => child.remove())
  }
}
