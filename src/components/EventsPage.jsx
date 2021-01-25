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

    componentDidMount() {
        // this.props.eventsStore.loadDummyDataToStore()   // data is already loaded in the app.js file
        if (this.props.eventsStore.userType == 'client') {
            console.log('create button should appear')
            this.setState({
                cardsToShow: this.props.eventsStore.events,
                createBtn: <Button onClick={this.createNewEvent}>Create</Button>
            })
        } else {
            console.log('create button should not appear')
            this.setState({
                cardsToShow: this.props.eventsStore.events
            })
        }
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
            return <div className='card' key={'div-' + element.id}><EventCard display={true} key={element.id} event={element} userType={this.props.eventsStore.userType} showAssignmentBtn={false} /></div>
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