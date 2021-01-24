import './App.css';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import React, { Component } from 'react'
import EditEvent from './components/EditEvent';
import MarketPlace from './components/MarketPlace';

export class App extends Component {

  componentDidMount() {
    this.props.eventsStore.loadDummyDataToStore()
  }

  render() {
    const editEventPage = this.props.eventsStore.events.map(element => {
      return <EditEvent event={element} />
    })
    return (
      <div className='app'>
        <Router>
          <Link to="/editEvent">EditEventPage</Link>
          &nbsp;&nbsp;
          <Link to="/marketplace">marketplace</Link>
          &nbsp;&nbsp;
            <Route path="/editEvent" component={() => editEventPage} />
            <Route path="/marketplace" component={() => <MarketPlace/>} />
        </Router>
      </div>
    )

  }
}

export default inject("eventsStore")(observer(App));