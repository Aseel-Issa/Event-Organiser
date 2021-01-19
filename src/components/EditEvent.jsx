import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

class EditEvent extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        this.props.eventsStore.loadDummyDataToStore()
        console.log(JSON.stringify(this.props.eventsStore.events))
    }

    render(){
        const titles = this.props.eventsStore.events.map(element => {return element.title})
        return(
            <div>
                {titles}
            </div>
        )
    }

}

export default inject("eventsStore")(observer(EditEvent))