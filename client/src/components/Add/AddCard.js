import React, { useState, useEffect } from 'react'
import './addcard.css'
import showdown from 'showdown'
import obj from '../config'
import { Redirect } from 'react-router-dom'

function AddCard ({ heading, id, editCard }) {
  const session = JSON.parse(window.localStorage.getItem('session'))
  const sid = session.sid
  let editQuestion, editDeck, editAns, saveBtn, updateBtn

  if (id) {
    const converter = new showdown.Converter()
    editDeck = editCard[0].deck
    editQuestion = converter.makeMarkdown(editCard[0].question)
    editAns = converter.makeMarkdown(editCard[0].answer)
    updateBtn = <button className='save-btn'>Update</button>
  } else {
    saveBtn = <button className='save-btn'>Save</button>
  }

  const [isSubmit, setIssubmit] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [markQ, setMarkQ] = useState('')
  const [markAns, setMarkAns] = useState('')
  const [cards, setCards] = useState([])
  const [question, setQuestion] = useState(editQuestion || '')
  const [answer, setAnswer] = useState(editAns || '')
  const [deck, setDeck] = useState(editDeck || '')
  const [decksOpt, setDecksForOpt] = useState([])

  setTimeout(() => setIssubmit(false), 4000)

  const handleDeck = e => {
    return setDeck(e.target.value)
  }

  const handleQuestion = e => {
    const value = e.target.value
    setQuestion(value)
  }

  const handleAnswer = e => {
    const value = e.target.value
    setAnswer(value)
  }

  async function addToDb (url, data) {
    const value = { ...data, sid }
    await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async function updateCard (url, card) {
    const value = { ...card, sid }
    const response = await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setIsUpdate(response.ok)
  }

  const handleSubmit = e => {
    if (id) {
      const card = {
        id: Number(id),
        deck: deck.toLowerCase() || editDeck,
        question: markQ || editQuestion,
        answer: markAns || editAns
      }
      updateCard(`${obj.url}/updateCard`, card)
    } else {
      const card = {
        deck: deck.toLowerCase(),
        question: markQ,
        answer: markAns,
        status: 'new',
        again: '60', // 1min
        easy: '900', // 15 min
        good: '86400' // 1 day
      }
      addToDb(`${obj.url}/addCard`, card)
      setCards([card, ...cards])
      setAnswer('')
      setQuestion('')
      setDeck('')
    }
    setIssubmit(true)
    e.preventDefault()
  }

  const handleQuestionBlur = () => {
    const converter = new showdown.Converter()
    const html = converter.makeHtml(question)
    setMarkQ(html)
  }

  const handleAnswerBlur = () => {
    const converter = new showdown.Converter()
    const html = converter.makeHtml(answer)
    setMarkAns(html)
  }

  async function getDataFromDb () {
    let data = await window.fetch(`${obj.url}/getDecknames/?sid=${sid}`)
    data = await data.json()
    setDecksForOpt(data)
  }

  useEffect(() => {
    getDataFromDb()
  }, [isSubmit])

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <section className='field'>
        <h1 className='heading'>{heading}</h1>
        <input
          className='input-box'
          type='text'
          placeholder='Enter the deck'
          onChange={(e) => handleDeck(e)}
          value={deck}
          list='deck-list'
          required
          autoFocus
        />
        <datalist id='deck-list'>
          {decksOpt.map(item => {
            return <option key={item.id}>{item.deck}</option>
          })}
        </datalist>
        <textarea
          className='qa-box'
          placeholder='Enter the Question'
          value={question}
          onChange={(event) => handleQuestion(event)}
          onBlur={() => handleQuestionBlur()}
        />
        <textarea
          className='qa-box'
          placeholder='Enter the Answer'
          value={answer} onChange={(event) => handleAnswer(event)}
          onBlur={() => handleAnswerBlur()}
        />
        {saveBtn || updateBtn}
        {isSubmit &&
          <p className='isSubmit-para'>Added Successfully</p>}
        {isUpdate && <Redirect to='/decks' />}
      </section>
    </form>
  )
}

export default AddCard
