import './App.css';
import { observer} from 'mobx-react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import React, { Component } from 'react'
import EditEvent from './components/EditEvent';
import Event from './components/viewEventComponents/event'

export class App extends Component {

  render() {
    return (
      <div className='app'>
      <Router>
            <Link to="/editEvent">EditEventPage</Link>
            &nbsp;&nbsp;
            <Route path="/editEvent" component={() => <EditEvent />}/>
            <Link to="/viewEvent">viewEvent</Link>
            <Route path="/viewEvent" component={() => <Event/>}></Route>
      </Router>
      </div>
    )

  }
}

export default observer(App);