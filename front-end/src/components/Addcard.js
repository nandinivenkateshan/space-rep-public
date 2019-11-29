import React, { useState } from 'react'
import 'bulma/css/bulma.css'
import './App.css'
import NavBar from './NavBar'
import showdown from 'showdown'
import 'regenerator-runtime/runtime'

function Cards () {
  const [markQ, setMarkQ] = useState('')
  const [markAns, setMarkAns] = useState('')
  const [cards, setCards] = useState([])
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [deck, setDeck] = useState('')

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
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const card = {
      deck: deck.toLowerCase(),
      question: markQ,
      answer: markAns
    }
    addToDb('http://localhost:3000/card', card)
    setCards([card, ...cards])
    setAnswer('')
    setQuestion('')
    setDeck('')
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
    <div>
      <NavBar />
      <form onSubmit={e => handleSubmit(e)}>
        <div className='field'>

          <input
            className='input-tag'
            type='text'
            placeholder='Enter the Deck'
            onChange={(e) => handleDeck(e)}
            value={deck}
          />
          <div className='control'>
            <textarea
              className='textarea is-danger has-fixed-size'
              placeholder='Enter the Question'
              value={question}
              onChange={(event) => handleQuestion(event)}
              onBlur={() => handleQuestionBlur()}
            />
          </div>
          <div className='control'>
            <textarea
              className='textarea is-focused has-fixed-size'
              placeholder='Enter the Answer'
              value={answer} onChange={(event) => handleAnswer(event)}
              onBlur={() => handleAnswerBlur()}
            />
          </div>
        </div>
        <div className='has-text-centered'>
          <button className='button is-success is-rounded is-center'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default Cards
