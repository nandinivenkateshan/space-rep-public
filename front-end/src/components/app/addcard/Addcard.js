import React, { useState } from 'react'
import './addcard.css'
import NavBar from '../navbar/Navbar'
import showdown from 'showdown'
import 'regenerator-runtime/runtime'

function Addcard () {
  const [isSubmit, setIssubmit] = useState(false)
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
    await window.fetch(url, {
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
    setIssubmit(true)
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
    <main>
      <NavBar />
      <form onSubmit={e => handleSubmit(e)}>
        <section className='field'>
          <input
            className='input-box'
            type='text'
            placeholder='Enter the Deck'
            onChange={(e) => handleDeck(e)}
            value={deck}
            required
          />
          <textarea
            className='question-box'
            placeholder='Enter the Question'
            value={question}
            onChange={(event) => handleQuestion(event)}
            onBlur={() => handleQuestionBlur()}
            required
          />
          <textarea
            className='answer-box'
            placeholder='Enter the Answer'
            value={answer} onChange={(event) => handleAnswer(event)}
            onBlur={() => handleAnswerBlur()}
            required
          />
          <button className='save-btn'>Save</button>
          {isSubmit &&
            <p className='isSubmit-para'>Added Successfully</p>}
        </section>
      </form>
    </main>
  )
}

export default Addcard
