import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import NavBar from '../navbar/Navbar'
import config from '../../Config'

function StudyNow () {
  const url = config().url
  const { id: deckName } = useParams()
  const [arr, setArr] = useState([])
  const [showStudy, setStudy] = useState(true)
  const [showQuestion, setShowQuestion] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  let answerDiv, studyDiv, questionDiv

  useEffect(() => {
    console.log('useEffect rendering')
    async function getDataFromDb () {
      const data = await window.fetch(`${url}/cards`)
      const res = await data.json()
      const res1 = res.filter(item => item.deck === deckName)
      const res2 = res1.reduce((acc, cv) => {
        if (cv.deckclicktime >= Number(cv.timestamp)) {
          acc.push(cv)
        }
        return acc
      }, [])
      console.log('res:', res)
      console.log('res1:', res1)
      console.log('res2:', res2)
      setArr(res2)
    }
    getDataFromDb()
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
    const timeStamp = Date.now() + (15 * 60 * 1000)
    modifyTimeStamp(`${url}/updateTimeStamp`,
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
    const timeStamp = Date.now() + (24 * 60 * 60 * 1000)
    modifyTimeStamp(`${url}/updateTimeStamp`,
      { id, timeStamp }
    )
    setArr(arr.slice(1))
    setShowQuestion(true)
    setShowAnswer(false)
  }

  if (showStudy) {
    studyDiv = (
      <div className='study-box'>
        {console.log(arr)}
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
          <p className='congrats-msg'>Congratulations ! You have finished this deck for now</p>
      }
    </main>
  )
}

export default StudyNow
