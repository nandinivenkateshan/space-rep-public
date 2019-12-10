import React, { useState, useEffect } from 'react'
import './addcard.css'
import NavBar from '../navbar/Navbar'
import showdown from 'showdown'
import 'regenerator-runtime/runtime'
import config from '../../Config'

function Addcard () {
  const url = config().url
  const [isSubmit, setIssubmit] = useState(false)
  const [markQ, setMarkQ] = useState('')
  const [markAns, setMarkAns] = useState('')
  const [cards, setCards] = useState([])
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [deck, setDeck] = useState('')
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

  const handleSubmit = e => {
    e.preventDefault()
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
            list='deck-list'
            required
          />
          <datalist id='deck-list'>
            {decksOpt.map(item => {
              return <option key={item.id}>{item.deck}</option>
            })}
          </datalist>

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
