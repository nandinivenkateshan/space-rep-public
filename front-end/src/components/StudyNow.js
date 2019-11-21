import React, { useState } from 'react'
import { useParams, Switch, Route, Link, useRouteMatch } from 'react-router-dom'

function StudyNow (props) {
  let answerDiv, studyDiv, questionDiv
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

  function handleGoodAns (id) {
    const timeStamp = Date.now() + (2 * 60 * 60 * 1000)
    const item = data.map(item => {
      if (item.id === id) {
        item.timeStamp = timeStamp
        return item
      }
      return item
    })
    
  }

  if (showStudy) {
    studyDiv = (
      <div className='study-box'>
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
      </div>)
  }

  if (showQuestion && items.length) {
    questionDiv = (
      <div>
        <h3>{items[0].question}</h3>
        <button onClick={() => handleQuestion()} className='study-btn'>Show Answer</button>
      </div>
    )
  }

  if (showAnswer && items.length) {
    answerDiv = (
      <div>
        <h3>{items[0].answer}</h3>
        <button onClick={() => handleAnswer()} className='study-btn'>Easy</button>
        <button onClick={() => handleGoodAns(items[0].id)} className='study-btn'>Good</button>
      </div>
    )
  }

  return (
    <div>
      {studyDiv || answerDiv || questionDiv}
      {
        !items.length &&
          <h1>Congratulations ! You have finished this deck for now</h1>
      }
    </div>
  )
}

export default StudyNow
