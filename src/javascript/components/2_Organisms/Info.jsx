import React, { Component } from 'react'
import Character from '../../../assets/Character_1.svg'

export default class Info extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Info">
        <div className="back"></div>
        <div className="sinopsis">
          <p>
            Действие разворачивается после того, как сбежавшие с картин Краска,
            Клякса и Блик решили отомстить арт-сообществу
            за&#160;пренебрежительное отношение в современном исскустве.
          </p>
          <p>
            Их план состоит в переманивании молодых художников на&#160;«темную»
            сторону, убеждая их создавать подделки.
          </p>
          <p>
            Теперь вам предстоит сталь одним из художников фальсификаторов и
            заработать достаточно, чтобы скупить все&#160;оригинальные работы.
          </p>
        </div>
        <div className="character">
          <div className="img">
            <div className="wall"></div>
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
            <div className="wall"></div>
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
          <div className="content">
            <h1>Клякса</h1>
            <p>
              Тот самый участник, который непонятно как в нее попал и что
              делает.
            </p>
          </div>
          <div className="img">
            <span dangerouslySetInnerHTML={{ __html: Character }} />
            <div className="wall"></div>
          </div>
        </div>
        <div className="credits">
          <h1>Авторы</h1>

          <div className="authors">
            <div className="author">
              <p>Идея, раработка, дизайн и тд и тп </p>
              <div className="l">
                <p>Инсафутдинова Валерия</p>
                <div className="links">
                  <a>Sosial</a>
                  <a>Sosial</a>
                  <a>Sosial</a>
                </div>
              </div>
            </div>
            <div className="author">
              <p>Кураторская работа</p>
              <div className="l">
                <p>Захар день</p>
                <div className="links">
                  <a>Sosial</a>
                  <a>Sosial</a>
                  <a>Sosial</a>
                </div>
              </div>
            </div>
          </div>
          <p>
            Проект выполнен в качестве дипломой работы в университете
            <a> НИУ ВШЭ</a>, <a>Школа дизайна</a>
          </p>
          <div className="links">
            <div className="block">
              <p>Связанные ссылки</p>
              <div className="l">
                <a>Sosial</a>
                <a>Sosial</a>
                <a>Sosial</a>
              </div>
            </div>
            <div className="block">
              <p>Социальные сети</p>
              <div className="l">
                <a>Sosial</a>
                <a>Sosial</a>
                <a>Sosial</a>
              </div>
            </div>
          </div>
          <span> Москва, 2022 год</span>
        </div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
      </div>
    )
  }
}

// <div className="bor"></div>
