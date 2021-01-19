import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import EditInfo from './EditDetails'
import EditThemes from './EditThemes';

class EditEvent extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        this.props.eventsStore.loadDummyDataToStore()
        // console.log(JSON.stringify(this.props.eventsStore.events))
    }

    render(){
        // to be changed later
         const info = this.props.eventsStore.events.map(element => {
             return <EditInfo key={element.id} event={element}/>})
             const themeSection = this.props.eventsStore.events.map(element => {
                return <EditThemes key={element.id} event={element}/>})
        return(
            <div>
               {info} 
               <hr></hr>
               {themeSection}
               <hr></hr>
            </div>
        )
    }

}

export default inject("eventsStore")(observer(EditEvent))