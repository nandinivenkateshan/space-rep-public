import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Router.js'
// import App from './App'

// Hot module replacement (HMR)
// if (module.hot) {
//   module.hot.accept()
// }
ReactDOM.render(<Routes />, document.getElementById('root'))
