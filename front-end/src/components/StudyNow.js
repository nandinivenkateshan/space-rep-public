import React from 'react'
import { useParams, Switch, Route, Link, useRouteMatch } from 'react-router-dom'

function StudyNow (props) {
  const { props: array } = props
  const { id: deckName } = useParams()
  function handleShow () {
    
  }
  return (
    <div className='study-box'>
      <table className='study-table'>
        <tr>
          <th className='deck-name'>{deckName.toUpperCase()}</th>
        </tr>
        <tr>
          <td>Total</td>
          <td>{array.length}</td>
        </tr>
      </table>
      <button onClick={() => handleShow()}>Study Now</button>
    </div>
  )
}

export default StudyNow
