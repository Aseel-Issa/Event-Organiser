import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import EventCard from "./EventCard";
import { Button } from "@material-ui/core";
import Event from '../classes/Event'
import Flowers from "../classes/Flowers";
import { Route, withRouter } from 'react-router-dom';


class EventsPage extends Component {
    constructor() {
        super()
        this.state = {
            occasionFilter: 'All',
            searchStr: '',
            cardsToShow: [],
            createBtn: null
        }
    }
    
    componentWillMount() {
        // this.props.eventsStore.loadDummyDataToStore()   // data is already loaded in the app.js file
        console.log('userType: '+this.props.eventsStore.userType)
        if (this.props.eventsStore.userType == 'client') {
            console.log('create button should appear')
            this.setState({
                cardsToShow: this.props.eventsStore.events,
                createBtn: <Button className='tabBtn' onClick={this.createNewEvent}>Create</Button>
            })
        } else {
            console.log('create button should not appear')
            this.setState({
                cardsToShow: this.props.eventsStore.events
            })
        }
    }

    viewEvent = (event) => {
        // Route to view event page
        console.log(event)
        this.props.history.push({
            pathname: '/viewEvent',
            state: { eventId: event.id}
        });
    }

    createNewEvent = () => {
        // route to EditEvent component
        this.props.history.push({
            pathname: '/createEvent'
        });
    }

    render() {
        const cards = this.state.cardsToShow.map(element => {
            if (element == null || element == undefined) {
                return null
            }
            return <div className='card' key={'div-' + element.id}><EventCard display={true} key={element.id} event={element} userType={this.props.eventsStore.userType} showAssignmentBtn={false} viewEvent={this.viewEvent}/></div>
        })
        return (
            <div class='pageContent'>
                {this.state.createBtn}
                <hr></hr>
                {cards}
            </div>)
    }
}

export default withRouter(inject("eventsStore")(observer(EventsPage)))