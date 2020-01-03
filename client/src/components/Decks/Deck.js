import React, { useEffect, useReducer } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import url from '../../url/config'
import Question from './Question'
import Answer from './Answer'
import { getSession } from '../../util'
import NetworkErr from '../NetworkError'
import { fetchGet } from '../../fetch'

const initialState = {
  arr: [],
  showStudy: true,
  showQuestion: false,
  showAnswer: false,
  edit: false,
  editId: '',
  newCards: [],
  learningCards: [],
  reviewCards: [],
  netErr: false
}

function reducer (state, action) {
  switch (action.type) {
    case 'setArr':
      return {
        ...state,
        arr: [...action.newArr],
        newCards: [...action.newCards],
        learningCards: [...action.learningCards],
        reviewCards: [...action.reviewCards]
      }
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
    case 'netErr' :
      return { ...state, netErr: true }
    default: console.log('Unexpected action')
  }
}

function Deck () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { id: deckName } = useParams()
  let studyDiv, congratsMsg
  const session = getSession()
  const sid = session.sid

  async function getData () {
    const response = await fetchGet(`${url}/getCards/?sid=${sid}`)
    if (response.err) {
      dispatch({ type: 'netErr' })
    } else {
      const res = await response.json()
      const res1 = res.filter(item => item.deck === deckName)
      const res2 = res1.reduce((acc, cv) => {
        if (Number(cv.deckclicktime) >= Number(cv.timestamp)) {
          acc.push(cv)
        }
        return acc
      }, [])
      const newCards = res2.filter(item => item.status === 'new')
      const learningCards = res2.filter(item => item.status === 'learning')
      const reviewCards = res2.filter(item => item.status === 'review')
      dispatch({ type: 'setArr', newArr: res2, newCards: newCards, learningCards: learningCards, reviewCards: reviewCards })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  function handleStudy (value) {
    dispatch(value)
  }

  function handleNetErr (value) {
    dispatch(value)
  }

  if (state.showStudy) {
    studyDiv = (
      <main className='study-box'>
        <h1 className='heading'>{deckName.toUpperCase()}</h1>
        <section className='details'>
          <div className='count'>
            <label>New</label>
            <label>{state.newCards.length}</label>
          </div>
          <div className='count'>
            <label>In Learning</label>
            <label>{state.learningCards.length}</label>
          </div>
          <div className='count'>
            <label>To Review</label>
            <label>{state.reviewCards.length}</label>
          </div>
        </section>
        <button onClick={() => handleStudy({ type: 'study' })} className='study-btn'>Study Now</button>
      </main>)
  }

  if (!state.arr.length) {
    congratsMsg = <p className='congrats-msg'>Congratulations ! You have finished this deck for now</p>
  }

  return (
    <>
      {state.netErr && <NetworkErr />}
      {!state.netErr &&
        <main className='main'>
          <NavBar />

          {studyDiv || congratsMsg}

          {state.edit &&
            <Redirect to={`/edit/${state.editId}`} />}

          {state.showQuestion && state.arr.length &&
            <Question
              question={state.arr[0].question}
              id={state.arr[0].id}
              onQuestion={() => handleStudy({ type: 'question' })}
              onEdit={id => handleStudy({ type: 'edit', editId: id })}
            />}

          {state.showAnswer && state.arr.length &&
            <Answer
              cards={state.arr}
              onAgainAns={card => handleStudy(card)}
              onEasyOrGood={card => handleStudy(card)}
              onEdit={id => handleStudy({ type: 'edit', editId: id })}
              onNetErr={val => handleNetErr({ type: 'netErr' })}
            />}

        </main>}
    </>
  )
}

export default Deck
