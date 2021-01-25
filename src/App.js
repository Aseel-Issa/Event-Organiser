import './App.css';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link, HashRouter } from 'react-router-dom'
import React, { Component } from 'react'
import EditEvent from './components/EditEvent';
import MarketPlace from './components/MarketPlace';
import EventsPage from './components/EventsPage';
import { createBrowserHistory as history} from 'history';
// import { hashHistory } from 'react-router';

export class App extends Component {

  async componentDidMount() {
    await this.props.eventsStore.loadDummyDataToStore()
  }

  render() {
    const editEventPage = this.props.eventsStore.events.map(element => {
      return <EditEvent event={element} />
    })
    return (
      <div className='app'>
      <HashRouter>
        <Router >
          <Link to="/editEvent">EditEventPage</Link>
          &nbsp;&nbsp;
          <Link to="/marketplace">marketplace</Link>
          &nbsp;&nbsp;
          <Link to="/events">EventsPage</Link>
          &nbsp;&nbsp;
            <Route path="/editEvent" component={() => editEventPage} />
            <Route path="/createEvent" component={() => <EditEvent/>} />
            <Route path="/marketplace" component={() => <MarketPlace/>} />
            <Route path="/events" component={() => <EventsPage/>} />
        </Router>
        </HashRouter>
      </div>
    )

  }
}

export default inject("eventsStore")(observer(App));