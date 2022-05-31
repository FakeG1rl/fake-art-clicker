import React, { Component } from 'react'
import Character from '../../../assets/Character_1.svg'

export default class Info extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Info">
        <div className="sinopsis">
          <p>
            Действие разворачивается после того, как сбежавшие с картин Краска,
            Клякса и Блик решили отомстить арт-сообществу за пренебрежительное
            отношение в современном исскустве.
          </p>
          <p>
            Их план состоит в переманивании молодых художников на «темную»
            сторону, убеждая их создавать подделки.
          </p>
          <p>
            Теперь вам предстоит сталь одним из художников фальсификаторов и
            заработать достаточно, чтобы скупить все оригинальные работы.
          </p>
        </div>
        <div className="character">
          <div className="img">
            <span dangerouslySetInnerHTML={{ __html: Character }} />
          </div>
          <div className="content">
            <h1>Краска</h1>
            <p>
              Зачинщик бунта и руководитель группы. Рассказываем новым
              художникам что к чему
            </p>
          </div>
        </div>
        <div className="character">
          <div className="img">
            <span dangerouslySetInnerHTML={{ __html: Character }} />
          </div>
          <div className="content">
            <h1>Блик</h1>
            <p>
              Пошел за краской, потому что ему хотелось новых ощущений. В
              команде отвечает за бухгалтерию
            </p>
          </div>
        </div>
        <div className="character">
          <div className="img">
            <span dangerouslySetInnerHTML={{ __html: Character }} />
          </div>
          <div className="content">
            <h1>Клякса</h1>
            <p>
              Тот самый участник, который непонятно как в нее попал и что
              делает.
            </p>
          </div>
        </div>
        <div className="credits"> Я, Захар, Вышка, Соц.Сети </div>
      </div>
    )
  }
}

// <div className="bor"></div>
