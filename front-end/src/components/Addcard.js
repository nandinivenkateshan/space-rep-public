import React, { useState, useEffect } from 'react'
import 'bulma/css/bulma.css'
import './App.css'
import showdown from 'showdown'
import ContentEditable from 'react-contenteditable'
import 'regenerator-runtime/runtime'

function Cards () {
  const [cards, setCards] = useState([])
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [deck, setDeck] = useState('')

  const handleDeck = e => {
    return setDeck(e.target.value)
  }

  const handleQuestion = e => {
    return setQuestion(e.target.innerText)
  }

  const handleAnswer = e => setAnswer(e.target.innerText)

  // useEffect(() => {
  //   async function getCards () {
  //     const response = await fetch('http://localhost:3000/cards')
  //     const data = await response.json()
  //   }
  //   getCards()
  // }, [])

  async function addToDb (url, data) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    await response.json()
  }

  const handleSubmit = e => {
    e.preventDefault()
    const card = {
      deck: deck.toLowerCase(),
      question: question,
      answer: answer
    }
    addToDb('http://localhost:3000/card', card)
    setCards(card, ...cards)
    setAnswer('')
    setQuestion('')
    setDeck('')
  }

  const handleMarkUpQues = () => {
    const converter = new showdown.Converter()
    const html = converter.makeHtml(question)
    return html
  }

  const handleMarkUpAns = () => {
    const converter = new showdown.Converter()
    const html = converter.makeHtml(answer)
    return html
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <div className='field'>
          <input
            className='input-tag'
            type='text'
            placeholder='Enter the Deck'
            onChange={(e) => handleDeck(e)}
            value={deck}
          />
          <ContentEditable
            html={handleMarkUpQues()}
            disabled={false}
            onKeyUp={e => handleQuestion(e)}
            className='question'
            data-placeholder='Enter the Question'
          />

          <ContentEditable
            html={handleMarkUpAns()}
            disabled={false}
            onKeyUp={e => handleAnswer(e)}
            className='answer'
            data-placeholder='Enter the Answer'
          />
        </div>
        <div className='has-text-centered'>
          <button className='button is-success is-rounded is-center'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default Cards
