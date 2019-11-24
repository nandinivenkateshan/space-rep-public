import React from 'react'
import ReactDOM from 'react-dom'
// import App from './App.jsx'
import SignUp from './SignUp.js'
// FYI - Write dev code here...

// Hot module replacement (HMR)
if (module.hot) {
  module.hot.accept()
}
ReactDOM.render(<SignUp />, document.getElementById('root'))
