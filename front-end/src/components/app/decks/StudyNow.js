import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import NavBar from '../navbar/Navbar'

function StudyNow () {
  const { id: deckName } = useParams()
  const [arr, setArr] = useState([])
  const [showStudy, setStudy] = useState(true)
  const [showQuestion, setShowQuestion] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  let answerDiv, studyDiv, questionDiv

  useEffect(() => {
    async function getDataFromDb () {
      let data = await window.fetch('http://localhost:3000/cards')
      data = await data.json()
      setArr(data.filter(item => item.deck === deckName))
    }
    getDataFromDb()
  }, [])

  useEffect(() => {
    const array = arr.reduce((acc, cv) => {
      if (cv.deckclicktime >= Number(cv.timestamp)) {
        acc.push(cv)
      }
      return acc
    }, [])

    setArr(array)
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
    setArr(arr.slice(1))
    setShowQuestion(true)
    setShowAnswer(false)
  }

  function handleAgainAnswer (id) {
    setArr([...arr.slice(1), arr[0]])
    setShowQuestion(true)
    setShowAnswer(false)
  }

  function handleGoodAnswer (id) {
    const timeStamp = Date.now() + (15 * 60 * 1000)
    modifyTimeStamp('http://localhost:3000/updateTimeStamp',
      { id, timeStamp }
    )
    setArr(arr.slice(1))
    setShowQuestion(true)
    setShowAnswer(false)
  }

  if (showStudy) {
    studyDiv = (
      <div className='study-box'>
        <h1 className='heading'>{deckName.toUpperCase()}</h1>
        <div className='details'>
          <label>Total</label>
          <label>{arr.length}</label>
        </div>
        <button onClick={() => handleStudy()} className='study-btn'>Study Now</button>
      </div>)
  }

  if (showQuestion && arr.length) {
    questionDiv = (
      <div className='showQuestion-box'>
        <div className='showQuestion'>{parse(arr[0].question)}</div>
        <button onClick={() => handleQuestion()} className='study-btn'>Show Answer</button>
      </div>
    )
  }

  if (showAnswer && arr.length) {
    answerDiv = (
      <div className='showAnswer-box'>
        <div className='showAnswer'>{parse(arr[0].answer)}</div>
        <div className='timings'>
          <label>&lt; 1 min</label>
          <label>&lt; 15 min</label>
          <label>1 day</label>
        </div>
        <div className='answer-btns'>
          <button onClick={() => handleAgainAnswer(arr[0].id)} className='btn'>Again</button>
          <button onClick={() => handleEasyAnswer(arr[0].id)} className='btn'>Easy</button>
          <button onClick={() => handleGoodAnswer(arr[0].id)} className='btn'>Good</button>
        </div>
      </div>
    )
  }

  return (
    <main>
      <NavBar />
      {studyDiv || answerDiv || questionDiv}
      {
        !arr.length &&
          <label className='congrats-msg'>Congratulations ! You have finished this deck for now</label>
      }
    </main>
  )
}

export default StudyNow
