import './App.css';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link, HashRouter } from 'react-router-dom'
import React, { Component } from 'react'
import EditEvent from './components/EditEvent';
import Event from './components/viewEventComponents/event'
import MarketPlace from './components/MarketPlace';
import EventsPage from './components/EventsPage';
import { createBrowserHistory as history} from 'history';
import Login from './login/login';
// import event from './components/viewEventComponents/event'
// import { hashHistory } from 'react-router';

export class App extends Component {

  constructor(){
    super()
    this.state= {
      appIsReady : false
    }
  }

  // async componentDidMount() {
  //   await this.props.eventsStore.loadDummyDataToStore()
  // }
  async componentWillMount () {
    await this.props.eventsStore.loadDummyDataToStore()
    this.setState({appIsReady: true})
  }

  render() {
    if(!this.state.appIsReady){
      return null
    }
    return (
      <div className='app'>
      <HashRouter>
        <Router >
          {/* <Link to="/editEvent">EditEventPage</Link> */}
          &nbsp;&nbsp;
          <Link to="/marketplace">marketplace</Link>
          &nbsp;&nbsp;
          <Link to="/events">EventsPage</Link>
          &nbsp;&nbsp;
          <Link to="/login">Login</Link>
            {/* <Route path="/editEvent" component={() => editEventPage} /> */}
            <Route path="/createEvent" component={() => <EditEvent/>} />
            <Route path="/marketplace" component={() => <MarketPlace/>} />
            <Route path="/events" component={() => <EventsPage/>} />
            <Route path="/viewEvent" component={() => <Event/>} />
            <Route path="/editEventPage" component={() => <EditEvent/>} />
            <Route path="/login" component={() => <Login/>} />
        </Router>
        </HashRouter>
      </div>
    )

  }
}

export default inject("eventsStore")(observer(App));