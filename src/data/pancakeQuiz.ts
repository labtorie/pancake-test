import {Question, QuizParams, Result} from "../lib/quiz";

export const resultsMap: Record<string, Result> = {
    caviar: {
        image: 'https://cdn.7days.ru/pic/c4d/835189/243976/86.jpg',
        title: 'Блин с икрой',
        description: 'Ты любишь роскошь и стиль, а твой любимый язык - деньги.'
    },
    cherry: {
        image: 'https://ru.ipepper.org/wp-content/uploads/2021/11/odinnadcatoe_foto26.jpg',
        title: 'Блин с вишней',
        description: 'Вечер, ужин, романтика - это все про тебя. '
    },
    ham: {
        title: 'Блин с ветчиной и сыром',
        image: 'https://www.maggi.ru/data/images/recept/img640x500/recept_5689_z6dc.jpg',
        description: 'Ты добродушный и открытый человек, на которого всегда можно положиться'
    },
    empty: {
        title: 'Пустой блин',
        image: 'https://skovorodka.com/upload/t-860x510-1474669121518093452.jpg',
        description: 'Самый обидный результат. Мб пройдешь еще разок?'
    },
    strawberry: {
        title: 'Блин с клубникой',
        image: 'https://cdn.lifehacker.ru/wp-content/uploads/2020/01/shutterstock_1523778806_1582645055-e1582645095360-1280x640.jpg',
        description: 'Лето, пляж, шалости... '
    },
    banana: {
        title: 'Блин с Нутеллой и бананом',
        image: 'https://i.ytimg.com/vi/GjKbzN6OHNk/hqdefault.jpg',
        description: 'Ты просто крейзи!'
    },
    meat: {
        title: "Блин с фаршем",
        image: 'https://img.iamcook.ru/2021/upl/recipes/cat/u-48454eef071aa4465713245c1cf5e7a3.JPG',
        description: 'Никому не понравился('
    },
    apple: {
        title: 'Блин с яблоком и корицей',
        image: 'https://volshebnaya-eda.ru/wp-content/uploads/2019/03/bliny-s-yablokami-i-koricej13-1.jpg',
        description: 'Самое то осенним вечерком!'
    }
}

export const params: QuizParams = {
    title: 'Какой ты блин?',
    resultsMap,
}

const answer = (text: string, props: string[]) => {
    return {
        text,
        values: props.map((property, index, {length})=>({
            property,
            delta: 1//length - index
        }))
    }
}
export const questions: Question[]  = [
    {
        text: 'Какой твой любимый цвет?',
        attachment: 'https://www.pravmir.ru/wp-content/uploads/tilda/21765/pages/115813/038bb6ef-6b33-43fb-a396-1bc5cb7939f0__1413952335_0_8e241_ace6e454_orig.jpg',
        answers: [
            answer('Синий', ['strawberry', 'meat', 'apple']),
            answer('Белый', ['ham', 'banana', 'apple']),
            answer('Не знаю', ['empty', 'meat']),
            answer('Желтый', ['banana', 'apple']),
            answer('Красный', ['caviar', 'strawberry', 'cherry'])
        ]
    },
    {
        text: 'Куда пойдешь на обед?',
        attachment: 'https://img1.russianfood.com/dycontent/images_upl/457/big_456172.jpg',
        answers: [
            answer('Арден', ['caviar', 'cherry']),
            answer('Хачапури и Вино', ['cherry', 'ham']),
            answer('Sunny Day', ['ham', 'meat']),
            answer('Шаверма у Шера', ['ham', 'empty', 'meat']),
            answer('Не знаю', ['empty']),
            answer('Балаган', ['caviar', 'strawberry']),
        ]
    },
    {
        text: 'Куда бы поехать на отпуск?',
        attachment: 'https://ot39.ru/images/Otpusk_2.jpeg',
        answers: [
            answer('Хз я дома лучше отдохну', ['empty', 'meat']),
            answer('Мальдивы', ['strawberry', 'banana']),
            answer('На дачу', ['ham', 'meat', 'apple']),
            answer('В Париж', ['caviar', 'cherry', 'ham', 'banana', 'strawberry'])
        ]
    },
    {
        text: 'Какой кофе ты пьешь?',
        attachment: 'https://img1.russianfood.com/dycontent/images_upl/262/big_261108.jpg',
        answers: [
            answer('Американо', ['cherry', 'apple']),
            answer('Капучино', ['ham', 'meat']),
            answer('Айс латте', ['strawberry', 'cherry']),
            answer('Бамбл', ['banana']),
            answer('Не пью кофе', ['empty', 'meat'])
        ]
    },
    {
        text: 'Когда ты родился?',
        attachment: 'https://pro-hospice.ru/upload/iblock/207/1tq0g7u9143ui5u3yzpwckhe8mkyafua/02011laf-c683-434x434.jpg',
        answers: [
            answer('Зимой', ['caviar', 'apple']),
            answer('Весной', ['ham']),
            answer('Летом', ['strawberry']),
            answer('Осенью', ['cherry', 'meat']),
        ]
    }
]
