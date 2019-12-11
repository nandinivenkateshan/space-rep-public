import React from 'react'
import './addcard.css'
function EnterDeck (props) {
  const { value: deck, onEnterDeck, decksOpt } = props
  function handleDeck (e) {
    onEnterDeck(e)
  }
  return (
    <>
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
    </>
  )
}
export default EnterDeck
