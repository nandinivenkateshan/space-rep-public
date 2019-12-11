import React from 'react'
import './addcard.css'

function TextQA (props) {
  const { value, onHandleQustion, onHandleQustionBlur, onHandleAnswer, onHandleAnswerBlur } = props
  const handleQA = e => {
    if (onHandleQustion) return onHandleQustion(e)
    return onHandleAnswer(e)
  }
  const handleQABlur = () => {
    if (onHandleQustionBlur) return onHandleQustionBlur()
    return onHandleAnswerBlur()
  }
  return (
    <textarea
      className='qa-box'
      placeholder='Enter the Question'
      value={value}
      onChange={e => handleQA(e)}
      onBlur={() => handleQABlur()}
      required
    />
  )
}

export default TextQA
