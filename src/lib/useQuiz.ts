import {Question, Quiz, QuizParams, Result} from './quiz'
import {useRef, useState} from "react";

type Answer = Question["answers"][number]

interface IUseQuiz {
    question: {
        text: Question["text"],
        attachment: Question["attachment"],
    }
    answers: Answer[],
    onAnswerSubmit: (answers: number[]) => void,
    progress: number,
    isFinal: boolean,
    results: null | Result
}

export const useQuiz = (params: QuizParams, questions: Question[]): IUseQuiz => {
    const quiz = useRef(new Quiz(params, questions)).current

    const [currentQuestion, setCurrentQuestion] = useState<Question>(quiz.getQuestion())
    const [quizState, setQuizState] = useState({progress: 0, isFinal: false})
    const [results, setResults] = useState<null | Result>(null)

    const onAnswerSubmit = (answers: number[]) => {
        quiz.submitAnswer(answers)
        if (quizState.isFinal) {
            setResults(quiz.getResults())
        } else {
            setCurrentQuestion(quiz.getQuestion())
            const isLast = quiz.currentQuestion === quiz.totalQuestions - 1
            setQuizState({
                progress: quiz.currentQuestion / quiz.totalQuestions,
                isFinal: isLast
            })
        }
        quiz.__debug()
    }


    return {
        question: {
            text: currentQuestion.text,
            attachment: currentQuestion.attachment,
        },
        answers: currentQuestion.answers,
        onAnswerSubmit,
        progress: quizState.progress,
        isFinal: quizState.isFinal,
        results,
    }
}
