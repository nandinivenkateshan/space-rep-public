import React from 'react'
import ReactDOM from 'react-dom'
// import App from './App.jsx'
// import SignUp from './sign-up/SignUp'
 import Login from './login/Login'
// import Home from './home/Home'
// FYI - Write dev code here...

// Hot module replacement (HMR)
if (module.hot) {
  module.hot.accept()
}
ReactDOM.render(<Login />, document.getElementById('root'))
