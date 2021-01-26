import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Details from './Details'
import Theme from './theme'
import Food from './food'
import Flowers from './flowers'
import Music from './music'
import Place from './place'
import { FaEdit } from "react-icons/fa";
import Button from '@material-ui/core/Button';
import { Route, withRouter } from 'react-router-dom';




class Event extends Component {

    constructor(){
        super()
        this.state = {
            event: undefined
        }
    }

    editEvent = () => {
        // Route to view event page
        console.log(this.state.event)
        this.props.history.push({
            pathname: '/editEventPage',
            state: { eventId: this.state.event.id }
        });
    }
    componentDidMount(){
        this.setState({
            event: this.props.eventsStore.getEventById(this.props.location.state.eventId)
        })
    }

    render() {
        if(this.state.event == undefined){
            return null
        }
        // let editBtn = null
        // if(this.props.showEdit){
        //     editBtn = <span className="edit"><FaEdit size={50} onClick={this.editEvent} /></span>
        // }
        const event = this.state.event
        console.log(JSON.stringify(event))
        return (
            <div className='pageContent'>
                <div className="head">
                    <div>
                        <span className="status">{event.status}</span>
                        <span className="edit"><FaEdit size={50} onClick={this.editEvent} /></span>
                    </div>
                </div>
                <Details details={event} />
                <Theme theme={event.theme} />
                <Food food={event.food} />
                <Flowers flowers={event.flowers} />
                <Music music={event.musicList} />
                <Place place={event.place} />
                <div className="buttons">
                    <Button variant="contained" color="primary">Cancel</Button>
                    <Button variant="contained" color="primary">Make Order</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(inject("eventsStore")(observer(Event)));