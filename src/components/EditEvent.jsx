import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import EditInfo from './EditDetails'
import EditThemes from './EditThemes';
import EditFoodSection from './EditFoodSection'
import EditMusicSection from './EditMusicSection'
import EditPlaceSection from './EditPlaceSection'
import EditFlowersSection from './EditFlowersSection'
import { Button } from '@material-ui/core';

class EditEvent extends Component {
    constructor() {
        super()
        this.state = {
            event: undefined
        }
    }

    componentDidMount(){
        this.setState({
            event: this.props.event
        })
    }

    updateEventState = (newEvent) => {
       console.log('updateEventState     '+JSON.stringify(newEvent))
        this.setState({event: newEvent})
    }

    saveEvent = () => {
        this.props.eventsStore.updateEvent(this.state.event)
    }

    cancelEditing = () => {
        // route to the view event page
    }

    render(){
        if(this.state.event == undefined){
            return null
        }
        return(
            <div class='pageContent'>
               <EditInfo event={this.state.event} updateEventState={this.updateEventState}/> 
               <hr></hr>
               <EditThemes event={this.state.event } updateEventState={this.updateEventState}/>
               <hr></hr>
               <EditFoodSection event={this.state.event} updateEventState={this.updateEventState}/>
               <hr></hr>
               <EditMusicSection event={this.state.event} updateEventState={this.updateEventState}/>
               <hr></hr>
               <EditFlowersSection event={this.state.event} updateEventState={this.updateEventState}/>
               <hr></hr>
               <EditPlaceSection event={this.state.event} updateEventState={this.updateEventState}/>
               <hr></hr>
               <Button className='tabBtn' onClick={this.cancelEditing}>Cancel</Button>
               <Button className='tabBtn' onClick={this.saveEvent}>Save</Button>
            </div>
        )
    }

}

export default inject("eventsStore")(observer(EditEvent))