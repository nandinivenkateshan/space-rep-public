import React, { useState } from 'react'
import { useParams, Switch, Route, Link, useRouteMatch } from 'react-router-dom'

function StudyNow (props) {
  const { props: data } = props
  const [items, setItems] = useState(data)
  const [showQuestion, setShowQuestion] = useState(false)
  const [showStudy, setStudy] = useState(true)
  const [showAnswer, setShowAnswer] = useState(false)
  const { id: deckName } = useParams()

  function handleStudy () {
    setStudy(false)
    setShowQuestion(true)
  }

  function handleQuestion () {
    setShowQuestion(false)
    setShowAnswer(true)
  }

  function handleAnswer () {
    setItems(items.slice(1))
    setShowQuestion(true)
    setShowAnswer(false)
  }

  return (
    <div className='study-box'>

      {showStudy &&
        <div>
          <table className='study-table'>
            <tr>
              <th className='deck-name'>{deckName.toUpperCase()}</th>
            </tr>
            <tr>
              <td>Total</td>
              <td>{items.length}</td>
            </tr>
          </table>
          <button onClick={() => handleStudy()}>Study Now</button>
        </div>}
        
      {showQuestion && items.length &&
        <div>
          <h3>{items[0].question}</h3>
          <button onClick={() => handleQuestion()}>Show Answer</button>
        </div>}

      {showAnswer && items.length &&
        <div>
          <h3>{items[0].answer}</h3>
          <button onClick={() => handleAnswer()}>Easy</button>
        </div>}

      {
        !items.length &&
          <h1>Congratulations ! You have finished this deck for now</h1>
      }

    </div>
  )
}

export default StudyNow
