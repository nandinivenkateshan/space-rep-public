import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'

function StudyNow (props) {
  let answerDiv, studyDiv, questionDiv
  const { props: data, deckClickTime } = props
  const [items, setItems] = useState(data)
  const [showQuestion, setShowQuestion] = useState(false)
  const [showStudy, setStudy] = useState(true)
  const [showAnswer, setShowAnswer] = useState(false)
  const { id: deckName } = useParams()

  useEffect(() => {
    const array = items.reduce((acc, cv) => {
      if (deckClickTime >= Number(cv.timestamp)) {
        acc.push(cv)
      }
      return acc
    }, [])

    setItems(array)
  }, [])

  async function modifyTimeStamp (url, data) {
    await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
  }

  function handleStudy () {
    setStudy(false)
    setShowQuestion(true)
  }

  function handleQuestion () {
    setShowQuestion(false)
    setShowAnswer(true)
  }

  function handleEasyAnswer (id) {
    const timeStamp = Date.now() + (1 * 60 * 60 * 1000)
    modifyTimeStamp('http://localhost:3000/updateTimeStamp',
      { id, timeStamp }
    )
    setItems(items.slice(1))
    setShowQuestion(true)
    setShowAnswer(false)
  }

  function handleAgainAnswer (id) {
    setItems([...items.slice(1), items[0]])
    setShowQuestion(true)
    setShowAnswer(false)
  }

  function handleGoodAnswer (id) {
    const timeStamp = Date.now() + (15 * 60 * 1000)
    modifyTimeStamp('http://localhost:3000/updateTimeStamp',
      { id, timeStamp }
    )
    setItems(items.slice(1))
    setShowQuestion(true)
    setShowAnswer(false)
  }

  if (showStudy) {
    studyDiv = (
      <div className='study-box'>
        <h1 className='heading'>{deckName.toUpperCase()}</h1>
        <div className='details'>
          <label>Total</label>
          <label>{items.length}</label>
        </div>
        <button onClick={() => handleStudy()} className='study-btn'>Study Now</button>
      </div>)
  }

  if (showQuestion && items.length) {
    questionDiv = (
      <div className='showQuestion-box'>
        <div className='showQuestion'>{parse(items[0].question)}</div>
        <button onClick={() => handleQuestion()} className='study-btn'>Show Answer</button>
      </div>
    )
  }

  if (showAnswer && items.length) {
    answerDiv = (
      <div className='showAnswer-box'>
        <div className='showAnswer'>{parse(items[0].answer)}</div>
        <div className='timings'>
          <label>&lt; 1 min</label>
          <label>&lt; 15 min</label>
          <label>1 day</label>
        </div>
        <div className='answer-btns'>
          <button onClick={() => handleAgainAnswer(items[0].id)} className='btn'>Again</button>
          <button onClick={() => handleEasyAnswer(items[0].id)} className='btn'>Easy</button>
          <button onClick={() => handleGoodAnswer(items[0].id)} className='btn'>Good</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {studyDiv || answerDiv || questionDiv}
      {
        !items.length &&
          <label className='congrats-msg'>Congratulations ! You have finished this deck for now</label>
      }
    </div>
  )
}

export default StudyNow
