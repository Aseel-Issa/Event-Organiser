import './App.css';
import { observer} from 'mobx-react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import React, { Component } from 'react'

export class App extends Component {

  render() {
    return (
      <div className='app'>
      {/* <Router>
            <Link to="/clients">Clients</Link>
            &nbsp;&nbsp;
            <Link to="/actions">Actions</Link>
            &nbsp;&nbsp;
            <Route path="/clients" component={() => <Clients />}/>
            <Route path="/actions" component={() => <Actions />}/>
      </Router> */}
      </div>
    )

  }
}

export default observer(App);