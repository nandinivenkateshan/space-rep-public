import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Router.js'
// import Home from './home/Home'
//import Navbar from './navbar/nav'

// Hot module replacement (HMR)
// if (module.hot) {
//   module.hot.accept()
// }
ReactDOM.render(<Routes />, document.getElementById('root'))
