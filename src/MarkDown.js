import React from 'react'
import 'bulma/css/bulma.css'
import showdown from 'showdown'
import parse from 'html-react-parser'

function MarkDown (props) {
  const preview = {
    maxWidth: '250px',
    minHeight: '60px',
    boxShadow: '6px 6px 10px grey',
    textAlign: 'center',
    margin: '0 auto'
  }
  const { props: md } = props
  let result
  if (md !== '') {
    const converter = new showdown.Converter()
    const html = converter.makeHtml(md)
    result = parse(html)
  }
  return (
    <div style={preview}>
      <h1 class='title is-6 has-background-grey-lighter has-text-grey'>preview</h1>
      {result}
    </div>
  )
}
export default MarkDown
