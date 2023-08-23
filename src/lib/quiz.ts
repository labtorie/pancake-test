type Answer = {
    text: string,
    attachment?: string,
    values: {
        property: string,
        delta?: number,
        mode?: 'add' | 'multiply'
    }[]
}

export type Question = {
    text: string,
    attachment?: string, // img
    mode?: 'single' | 'multiple',
    answers: Answer[],
}

export type Result = {
    title: string,
    description?: string,
    image?: string,
}

export type QuizParams = {
    title: string,
    description?: string,
    cover?: string,
    resultsMap: Record<string, Result>
}

type Stats = {
    [key: string]: number
}

export class Quiz {
    readonly questions: Question[];
    readonly answers: { [key: number]: number[] }
    public currentQuestion: number;
    public title: string
    public description: string
    public cover: string
    public totalQuestions: number
    private stats: Stats = {}
    private balance: Stats = {}
    private resultsMap: QuizParams['resultsMap']

    constructor(params: QuizParams, questions: Question[]) {
        const {cover, description, title, resultsMap} = params
        this.title = title
        this.cover = cover ?? ''
        this.description = description ?? ''
        this.resultsMap = resultsMap ?? {}
        this.questions = questions
        this.totalQuestions = questions.length
        this.currentQuestion = 0
        this.answers = {}
        this.initializeStats()
    }

    private initializeStats() {
        for (let question of this.questions) {
            for (let answer of question.answers) {
                for (let value of answer.values) {
                    this.stats[value.property] = 0
                    this.balance[value.property] = this.balance[value.property] ? this.balance[value.property] + 1 : 1
                }
            }
        }
    }

    public getQuestion(): Question {
        return this.questions[this.currentQuestion]
    }

    public submitAnswer(answerIndexes: number[]) {
        const currentQuestion = this.questions[this.currentQuestion]
            this.answers[this.currentQuestion] = answerIndexes
            for (let answerIndex of answerIndexes) {
                const givenAnswer = currentQuestion.answers[answerIndex]
                const {values} = givenAnswer
                for (const {property, mode = 'add', delta = 1} of values) {
                    if (mode === 'add' ) {
                        this.stats[property] += delta
                    } else if (mode === 'multiply') {
                        this.stats[property] *= delta
                    }
                }
            }
            if (this.currentQuestion === this.totalQuestions - 1) {
                return
            } else {
                this.currentQuestion++
            }
    }

    public getResults () {
        const strongestProperty = Object.keys(this.stats).reduce((a, b) => this.stats[a] > this.stats[b] ? a : b);
        return this.resultsMap[strongestProperty]
    }


    public __debug () {
        console.log({
            question: this.questions[this.currentQuestion],
            stats: this.stats,
            balance: this.balance
        })


    }
}

