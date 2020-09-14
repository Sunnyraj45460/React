import React from 'react'
import {Route, BrowserRouter as Router ,Switch ,Link} from 'react-router-dom'
import About from './about'
import Home from './home'
import Quiz from '../Quiz/app'

const style={
    color:'white'
}

export default function App() {
    return (
        <Router>
          <div><Link to='/' style={style}>Home</Link></div>
          <div><Link to='/about' style={style}>About</Link></div>
          <div><Link to='/quiz' style={style}>Quiz</Link></div>
          <Switch>
            <Route path='/about' exact component={About}/>
            <Route path='/' exact component={Home}/>
            <Route path='/quiz' component={Quiz}/>
          </Switch>
        </Router>
    )
}
