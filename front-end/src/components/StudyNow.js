import React from 'react'
import { useParams, Switch, Route, Link, useRouteMatch } from 'react-router-dom'

function StudyNow () {
  const {showid} = useParams
  return (
    <div>Show QA</div>
  )
}

export default StudyNow
