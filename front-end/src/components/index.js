import React from 'react'
import ReactDOM from 'react-dom'
 import Routes from './Router.js'
// import Addcard from './app/addcard/Addcard'
// import App from './App'
// import Login from './login/Login'
// import Signup from './sign-up/SignUp'

// Hot module replacement (HMR)
// if (module.hot) {
//   module.hot.accept()
// }
ReactDOM.render(<Routes />, document.getElementById('root'))
