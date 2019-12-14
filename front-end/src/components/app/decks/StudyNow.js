import React, { useEffect, useReducer } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import parse from 'html-react-parser'
import NavBar from '../navbar/Navbar'
import url from '../../Config'

const initialState = {
  arr: [],
  showStudy: true,
  showQuestion: false,
  showAnswer: false,
  edit: false,
  editId: ''
}

function reducer (state, action) {
  switch (action.type) {
    case 'setArr':
      return { ...state, arr: [...action.newArr] }
    case 'study':
      return { ...state, showStudy: false, showQuestion: true }
    case 'question':
      return { ...state, showQuestion: false, showAnswer: true }
    case 'answer' :
      return { ...state, showQuestion: true, showAnswer: false }
    case 'easyAnswer':
      return { ...state, showQuestion: true, showAnswer: false, arr: [...action.newArr] }
    case 'againAnswer':
      return { ...state, showQuestion: true, showAnswer: false, arr: [...action.newArr] }
    case 'goodAnswer':
      return { ...state, showQuestion: true, showAnswer: false, arr: [...action.newArr] }
    case 'edit' :
      return { ...state, edit: true, editId: action.editId }
    default: console.log('Unexpected action')
  }
}

function StudyNow () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { id: deckName } = useParams()
  let answerDiv, studyDiv, questionDiv, congratsMsg

  useEffect(() => {
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
      dispatch({ type: 'setArr', newArr: res2 })
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
    dispatch({ type: 'study' })
  }

  function handleQuestion () {
    dispatch({ type: 'question' })
  }

  function handleEasyAnswer (id) {
    const timeStamp = Date.now() + (15 * 60 * 1000)
    modifyTimeStamp(`${url}/updateTimeStamp`,
      { id, timeStamp }
    )
    dispatch({ type: 'easyAnswer', newArr: state.arr.slice(1) })
  }

  function handleAgainAnswer (id) {
    dispatch({ type: 'againAnswer', newArr: [...state.arr.slice(1), state.arr[0]] })
  }

  function handleGoodAnswer (id) {
    const timeStamp = Date.now() + (24 * 60 * 60 * 1000)
    modifyTimeStamp(`${url}/updateTimeStamp`,
      { id, timeStamp }
    )
    dispatch({ type: 'goodAnswer', newArr: state.arr.slice(1) })
  }

  if (state.showStudy) {
    studyDiv = (
      <div className='study-box'>
        <h1 className='heading'>{deckName.toUpperCase()}</h1>
        <div className='details'>
          <label>Total</label>
          <label>{state.arr.length}</label>
        </div>
        <button onClick={() => handleStudy()} className='study-btn'>Study Now</button>
      </div>)
  }

  function handleEdit (id) {
    dispatch({ type: 'edit', editId: id })
  }

  if (state.showQuestion && state.arr.length) {
    questionDiv = (
      <section>
        <div className='showQuestion-box'>
          <div className='showQuestion'>
            {parse(state.arr[0].question)}
          </div>
          <button onClick={() => handleQuestion()} className='study-btn'>Show Answer</button>
        </div>
        <button className='edit-btn' onClick={() => handleEdit(state.arr[0].id)}>Edit</button>
      </section>
    )
  }

  if (state.showAnswer && state.arr.length) {
    answerDiv = (
      <section>
        <div className='showAnswer-box'>
          <div className='showAnswer'>
            {parse(state.arr[0].answer)}
          </div>
          <div className='timings'>
            <label>&lt; 1 min</label>
            <label>&lt; 15 min</label>
            <label>1 day</label>
          </div>
          <div className='answer-btns'>
            <button onClick={() => handleAgainAnswer(state.arr[0].id)} className='btn'>Again</button>
            <button onClick={() => handleEasyAnswer(state.arr[0].id)} className='btn'>Easy</button>
            <button onClick={() => handleGoodAnswer(state.arr[0].id)} className='btn'>Good</button>
          </div>
        </div>
        <button className='edit-btn' onClick={() => handleEdit(state.arr[0].id)}>Edit</button>
      </section>
    )
  }

  if (!state.arr.length) {
    congratsMsg = <p className='congrats-msg'>Congratulations ! You have finished this deck for now</p>
  }

  return (
    <main className='main'>
      <NavBar />
      {state.edit &&
        <Redirect to={`/edit/${state.editId}`} />}
      {studyDiv || answerDiv || questionDiv || congratsMsg}
    </main>
  )
}

export default StudyNow
