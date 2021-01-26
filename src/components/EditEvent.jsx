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
import { Route, withRouter } from 'react-router-dom';

class EditEvent extends Component {
    constructor() {
        super()
        this.state = {
            event: undefined,
            saveUpdateBtn: null,
            cancelBtn: null,
            createThemeList: true,
            createThemeList2: false
        }
    }

    componentDidMount() {
        if (this.props.event == undefined && this.props.location.state == undefined) {
             // this code workes when creating new event
            console.log('create instance')
            const flowersType = this.props.eventsStore.flowers[0]
            const fakeId = Math.floor(Math.random() * 1000000);
            const emptyEvent = new Event(fakeId.toString(), this.props.eventsStore.client, 'Pending', '', 'Wedding', '', '', '', 0, this.props.eventsStore.themes[0], [], new Flowers(flowersType.id, flowersType.category, { onTable: false, price: flowersType.onTablePrice }, { onEntry: false, price: flowersType.onEntryPrice }, { numOfStands: 0, price: flowersType.standPrice }, flowersType.img), [], [], null, [])
            this.props.eventsStore.events.push(emptyEvent)
            console.log('emptyEvent: ' + JSON.stringify(emptyEvent))
            this.setState({
                event: emptyEvent,
                saveUpdateBtn: <Button className='tabBtn' onClick={this.saveEvent}>Save</Button>,
                cancelBtn: <Button className='tabBtn' onClick={this.cancelEditingRedirectToEventsPage}>Cancel</Button>
            })
        } else if(this.props.location.state.eventId){
            // this code workes when the edit page s being accessed from the event's view page
            const event = this.props.eventsStore.getEventById(this.props.location.state.eventId)
            this.setState({
                event: event,
                saveUpdateBtn: <Button className='tabBtn' onClick={this.updateEvent}>Update</Button>,
                cancelBtn: <Button className='tabBtn' onClick={this.cancelEditingRedirectToViewPage}>Cancel</Button>
            })
        } else{
            console.log('update instance')
            this.setState({
                event: this.props.event,
                saveUpdateBtn: <Button className='tabBtn' onClick={this.updateEvent}>Update</Button>,
                cancelBtn: <Button className='tabBtn' onClick={this.cancelEditingRedirectToViewPage}>Cancel</Button>
            })
        }
        console.log('this.props.eventsStore.themes')
        console.log('****'+JSON.stringify(this.props.eventsStore.themes))
        // this.setState({ updateThemeList: this.props.eventsStore.themes })
    }

    updateThemeList = () => {
        this.setState({ createThemeList: !this.state.createThemeList,
            createThemeList2: !this.state.createThemeList2 })
    }

    updateEventState = (newEvent) => {
        console.log('updateEventState     ' + JSON.stringify(newEvent))
        this.setState({ event: newEvent })
    }

    updateEvent = async () => {
        console.log('editevent.updateEvent')
        await this.props.eventsStore.updateEvent({...this.state.event})
        this.props.history.push({
            pathname: '/viewEvent',
            state: { eventId: this.state.event.id}
        });
    }

    saveEvent = async () => {
        // const id = 
        // console.log('save this event'+ JSON.stringify(this.state.event))
        await this.props.eventsStore.createEvent({...this.state.event})
        // route to eventsPage component
        this.props.history.push({
            pathname: '/events'
        });
        // route to event view page
    }

    cancelEditingRedirectToViewPage = () => {
        // route to the view event page 
        this.props.history.push({
            pathname: '/viewEvent',
            state: { eventId: this.state.event.id}
        });
    }

    cancelEditingRedirectToEventsPage = () => {
        // route to the events page
        // route to eventsPage component
        this.props.history.push({
            pathname: '/events'
        });
    }

    render() {
        let themes
        if(this.state.createThemeList || this.state.createThemeList2){
            console.log('creating new EditThemes')
            themes = <EditThemes key={Math.random()} event={this.state.event} updateEventState={this.updateEventState} updateThemeList={this.state.updateThemeList}/>
        }
        if (this.state.event == undefined) {
            return null
        }
        return (
            <div class='pageContent'>
                <EditInfo event={this.state.event} updateEventState={this.updateEventState} updateThemeList={this.updateThemeList}/>
                <hr></hr>
                {themes}
                <hr></hr>
                <EditFoodSection event={this.state.event} updateEventState={this.updateEventState} />
                <hr></hr>
                <EditMusicSection event={this.state.event} updateEventState={this.updateEventState} />
                <hr></hr>
                <EditFlowersSection event={this.state.event} updateEventState={this.updateEventState} />
                <hr></hr>
                <EditPlaceSection event={this.state.event} updateEventState={this.updateEventState} />
                <hr></hr>
                {this.state.cancelBtn}
                {/* <Button className='tabBtn' onClick={this.cancelEditing}>Cancel</Button> */}
                {this.state.saveUpdateBtn}
            </div>
        )
    }

}

export default withRouter(inject("eventsStore")(observer(EditEvent)))