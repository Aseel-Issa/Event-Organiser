import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import EditInfo from './EditDetails'
import EditThemes from './EditThemes';
import EditFoodSection from './EditFoodSection'

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
            </div>
        )
    }

}

export default inject("eventsStore")(observer(EditEvent))