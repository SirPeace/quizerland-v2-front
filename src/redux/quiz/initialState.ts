import type { IQuiz } from './types'

const quizState: IQuiz = {
  currentQuestionIndex: 0,
  rightAttempts: 0,
  isFinished: false,
  isPreview: false,
  progressId: '',
  createdAt: '',
  updatedAt: '',

  id: '',
  userId: '',
  title: '',
  description: '',
  questions: [],

  // activeQuizId: 1,
  // quizzes: [
  //   {
  //     id: 1,
  //     currentQuestionId: 1,
  //     rightAttempts: 0,
  //     isFinished: false,
  //     title: 'Тест по географии',
  //     description:
  //       'География — комплекс естественных и общественных наук, изучающих структуру, функционирование и эволюцию географической оболочки, взаимодействие и распределение в пространстве природных и природно-общественных геосистем и их компонентов',
  //     questions: [
  //       {
  //         id: 1,
  //         text: 'Столица Великобритании?',
  //         correctAnswerId: 2,
  //         answers: [
  //           {
  //             id: 1,
  //             text: 'Париж',
  //           },
  //           {
  //             id: 2,
  //             text: 'Лондон',
  //           },
  //           {
  //             id: 3,
  //             text: 'Москва',
  //           },
  //           {
  //             id: 4,
  //             text: 'Токио',
  //           },
  //           {
  //             id: 5,
  //             text: 'Торонто',
  //           },
  //         ],
  //       },
  //       {
  //         id: 2,
  //         text: 'Столица Российской Федерации?',
  //         correctAnswerId: 3,
  //         answers: [
  //           {
  //             id: 1,
  //             text: 'Санкт-Петербург',
  //           },
  //           {
  //             id: 2,
  //             text: 'Торонто',
  //           },
  //           {
  //             id: 3,
  //             text: 'Москва',
  //           },
  //           {
  //             id: 4,
  //             text: 'Саратов',
  //           },
  //           {
  //             id: 5,
  //             text: 'Анкара',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ],
}

export default quizState
