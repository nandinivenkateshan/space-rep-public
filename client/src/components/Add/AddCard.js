import React, { useState, useEffect } from 'react'
import './addcard.css'
import showdown from 'showdown'
import url from '../../url/config'
import { Redirect } from 'react-router-dom'
import { getSession } from '../../util'
import { fetchPost, fetchGet } from '../../fetch'

function AddCard ({ heading, id, editCard, onNetErr }) {
  const converter = new showdown.Converter()
  let editQuestion, editDeck, editAns, saveBtn, updateBtn
  const sid = getSession().sid

  const makeHtml = value => {
    const html = converter.makeHtml(value)
    return html
  }

  const makeMarkdown = value => {
    const markDown = converter.makeMarkdown(value)
    return markDown
  }

  if (id) {
    editDeck = editCard[0].deck
    editQuestion = makeMarkdown(editCard[0].question)
    editAns = makeMarkdown(editCard[0].answer)
    updateBtn = <button className='save-btn'>Update</button>
  } else {
    saveBtn = <button className='save-btn'>Save</button>
  }

  const [isSubmit, setIssubmit] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [cards, setCards] = useState([])
  const [question, setQuestion] = useState(editQuestion || '')
  const [answer, setAnswer] = useState(editAns || '')
  const [deck, setDeck] = useState(editDeck || '')
  const [decksOpt, setDecksOpt] = useState([])

  setTimeout(() => setIssubmit(false), 4000)

  const handleDeck = e => {
    const value = e.target.value
    setDeck(value)
  }

  const handleQuestion = e => {
    const value = e.target.value
    setQuestion(value)
  }

  const handleAnswer = e => {
    const value = e.target.value
    setAnswer(value)
  }

  const fetchReq = async (url, card, data) => {
    const response = await fetchPost(url, card)
    if (data) {
      setIsUpdate(response.ok)
    }
    if (response.err) {
      onNetErr(true)
    }
  }

  const handleSubmit = e => {
    if (id) {
      const card = {
        id: Number(id),
        deck: deck.toLowerCase() || editDeck,
        question: makeHtml(question) || editQuestion,
        answer: makeHtml(answer) || editAns
      }
      fetchReq(`${url}/updateCard`, { ...card, sid }, 'update')
    } else {
      const card = {
        deck: deck.toLowerCase(),
        question: makeHtml(question),
        answer: makeHtml(answer),
        status: 'new',
        again: 60, // 1min
        easy: 900, // 15 min
        good: 86400 // 1 day
      }
      fetchReq(`${url}/addCard`, { ...card, sid })
      setCards([card, ...cards])
      setAnswer('')
      setQuestion('')
      setDeck('')
    }
    setIssubmit(true)
    e.preventDefault()
  }

  const deckNames = async () => {
    const response = await fetchGet(`${url}/getDecknames/?sid=${sid}`)
    if (response.err) {
      onNetErr(true)
    } else {
      const data = await response.json()
      setDecksOpt(data)
    }
  }

  useEffect(() => {
    deckNames()
  }, [isSubmit])

  return (
    <>
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
            required
          />
          <textarea
            className='qa-box'
            placeholder='Enter the Answer'
            value={answer}
            onChange={(event) => handleAnswer(event)}
            required
          />
          {saveBtn || updateBtn}
          {isSubmit &&
            <p className='isSubmit-para'>Added Successfully</p>}
          {isUpdate && <Redirect to='/decks' />}
        </section>
      </form>
    </>
  )
}

export default AddCard
