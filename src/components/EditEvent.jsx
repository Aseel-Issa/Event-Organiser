import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import EditInfo from './EditDetails'
import EditThemes from './EditThemes';
import EditFoodSection from './EditFoodSection'
import EditMusicSection from './EditMusicSection'
import EditPlaceSection from './EditPlaceSection'
import EditFlowersSection from './EditFlowersSection'
import { Button } from '@material-ui/core';
import Flowers from '../classes/Flowers'
import Event from '../classes/Event'

class EditEvent extends Component {
    constructor() {
        super()
        this.state = {
            event: undefined,
            saveUpdateBtn: null,
            cancelBtn: null
        }
    }

    componentDidMount() {
        if (this.props.event == undefined) {
            console.log('create instance')
            const flowersType = this.props.eventsStore.flowers[0]
            const fakeId = Math.floor(Math.random() * 1000000);
            const emptyEvent = new Event(fakeId.toString(), this.props.eventsStore.getClient(), 'Pending', '', 'Wedding', '', '', '', 0, this.props.eventsStore.themes[0], [], new Flowers(flowersType.id, flowersType.category, { onTable: false, price: flowersType.onTablePrice }, { onEntry: false, price: flowersType.onEntryPrice }, { numOfStands: 0, price: flowersType.standPrice }), [], [], null, [])
            this.props.eventsStore.events.push(emptyEvent)
            console.log('emptyEvent: ' + JSON.stringify(emptyEvent))
            this.setState({
                event: emptyEvent,
                saveUpdateBtn: <Button className='tabBtn' onClick={this.saveEvent}>Save</Button>,
                cancelBtn: <Button className='tabBtn' onClick={this.cancelEditingRedirectToEventsPage}>Cancel</Button>
            })
        } else {
            console.log('update instance')
            this.setState({
                event: this.props.event,
                saveUpdateBtn: <Button className='tabBtn' onClick={this.updateEvent}>Update</Button>,
                cancelBtn: <Button className='tabBtn' onClick={this.cancelEditingRedirectToViewPage}>Cancel</Button>
            })
        }
    }

    updateEventState = (newEvent) => {
        console.log('updateEventState     ' + JSON.stringify(newEvent))
        this.setState({ event: newEvent })
    }

    updateEvent = () => {
        this.props.eventsStore.updateEvent(this.state.event)
    }

    saveEvent = () => {
        // const id = 
        // console.log('save this event'+ JSON.stringify(this.state.event))
        this.props.eventsStore.createEvent({...this.state.event})
        // route to event view page
    }

    cancelEditingRedirectToViewPage = () => {
        // route to the view event page o
    }

    cancelEditingRedirectToEventsPage = () => {
        // route to the events page
    }

    render() {
        if (this.state.event == undefined) {
            return null
        }
        return (
            <div class='pageContent'>
                <EditInfo event={this.state.event} updateEventState={this.updateEventState} />
                <hr></hr>
                <EditThemes event={this.state.event} updateEventState={this.updateEventState} />
                <hr></hr>
                <EditFoodSection event={this.state.event} updateEventState={this.updateEventState} />
                <hr></hr>
                <EditMusicSection event={this.state.event} updateEventState={this.updateEventState} />
                <hr></hr>
                <EditFlowersSection event={this.state.event} updateEventState={this.updateEventState} />
                <hr></hr>
                <EditPlaceSection event={this.state.event} updateEventState={this.updateEventState} />
                <hr></hr>
                <Button className='tabBtn' onClick={this.cancelEditing}>Cancel</Button>
                {this.state.saveUpdateBtn}
            </div>
        )
    }

}

export default inject("eventsStore")(observer(EditEvent))