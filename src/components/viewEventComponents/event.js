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



class Event extends Component {
    render() {   
    this.props.eventsStore.loadDummyDataToStore()
    const event = this.props.eventsStore.events[0]
        return (
            <div>
                <div className="head">
                    <div>
                        <span className="status">{event.status}</span>
                        <span className="edit"><FaEdit size={50}/></span>
                    </div>
                </div>
                <Details details={event}/>
                <Theme theme={event.themes} />
                <Food food={event.food} />
                <Flowers flowers={event.flowers} />
                <Music music={event.music} />
                <Place place={event.place} />
                <div className="buttons">
                    <Button variant="contained" color="primary">Cancel</Button>
                    <Button variant="contained" color="primary">Make Order</Button>
                </div>
            </div>
        );
    }
}

export default inject("eventsStore")(observer(Event));