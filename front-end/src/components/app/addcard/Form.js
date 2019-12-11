import React, { useState, useEffect } from 'react'
import './addcard.css'
import showdown from 'showdown'
import 'regenerator-runtime/runtime'
import config from '../../Config'
import EnterDeck from './EnterDeck'
import TextQA from './TextQA'
import { Redirect } from 'react-router-dom'

function Form (props) {
  const { heading, id, editCard } = props
  let editQuestion, editDeck, editAns
  if (id) {
    editDeck = editCard[0].deck
    editQuestion = editCard[0].question
    editAns = editCard[0].answer
  }

  const url = config().url
  const [isSubmit, setIssubmit] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [markQ, setMarkQ] = useState('')
  const [markAns, setMarkAns] = useState('')
  const [cards, setCards] = useState([])
  const [question, setQuestion] = useState(editQuestion || '')
  const [answer, setAnswer] = useState(editAns || '')
  const [deck, setDeck] = useState(editDeck || '')
  const [decksOpt, setDecksForOpt] = useState([])

  setTimeout(() => setIssubmit(false), 3000)

  useEffect(() => {
    async function getDataFromDb () {
      let data = await window.fetch(`${url}/cards`)
      data = await data.json()
      const array = data.reduce((acc, cv) => {
        const val = acc.find(item => item.deck === cv.deck)
        if (!val) return acc.concat(cv)
        return acc
      }, [])
      setDecksForOpt(array)
    }
    getDataFromDb()
  }, [deck])

  const handleDeck = e => {
    return setDeck(e.target.value.trim())
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
    await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async function updateCard (url, card) {
    const response = await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(card),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      setIsUpdate(true)
    }
  }

  const handleSubmit = e => {
    if (id) {
      const card = {
        id: Number(id),
        deck: deck.toLowerCase() || editDeck,
        question: markQ || editQuestion,
        answer: markAns || editAns
      }
      updateCard(`${url}/updateCard`, card)
    } else {
      const card = {
        deck: deck.toLowerCase(),
        question: markQ,
        answer: markAns
      }
      addToDb(`${url}/card`, card)
      setCards([card, ...cards])
      setIssubmit(true)
      setAnswer('')
      setQuestion('')
      setDeck('')
    }
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

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <section className='field'>
        <h1 className='heading'>{heading}</h1>
        <EnterDeck value={deck} onEnterDeck={(e) => handleDeck(e)} decksOpt={decksOpt} placeholder='Enter the deck' />
        <TextQA
          placeholder='Enter the Question'
          value={question}
          onHandleQustion={e => handleQuestion(e)}
          onHandleQustionBlur={() => handleQuestionBlur()}
        />
        <TextQA
          placeholder='Enter the Answer'
          value={answer}
          onHandleAnswer={e => handleAnswer(e)}
          onHandleAnswerBlur={() => handleAnswerBlur()}
        />
        {!id &&
          <button className='save-btn'>Save</button>}
        {id &&
          <button className='save-btn'>Update</button>}
        {isSubmit &&
          <p className='isSubmit-para'>Added Successfully</p>}
        {isUpdate && <Redirect to='/decks' />}
      </section>
    </form>
  )
}

export default Form
