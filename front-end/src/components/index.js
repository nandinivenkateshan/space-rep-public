import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import SignUp from './SignUp'
import Login from './Login'
import Home from './Home'
// FYI - Write dev code here...

// Hot module replacement (HMR)
if (module.hot) {
  module.hot.accept()
}
ReactDOM.render(<Home />, document.getElementById('root'))
