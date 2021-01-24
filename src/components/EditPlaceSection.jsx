import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import FullWidthTabs from './FullWidthTabs'
import EditPlaceOption from './EditPlaceOption'
import { elementRoles } from 'aria-query';

class EditPlaceSection extends Component {
    constructor() {
        super()
        this.state = {
            placeOption: null
        }
    }

    removePlace = () => {
        this.setState({placeOption: null}, this.updatePlaceDetails(null))
    }
    addPlace = (placeOption) => {
        this.setState({placeOption: placeOption}, this.updatePlaceDetails(placeOption))
    }

    updatePlaceDetails = (placeOption) => {
        let newEvent = { ...this.props.event }
        if(placeOption == null){
            newEvent.place = null
        }else{
            newEvent.place = { ...placeOption }
        }
        this.props.updateEventState(newEvent)
    }

    assignContentToTab(tabs, element, content) {
        if (element.category == 'private') {
            tabs.privateTab.push(content)
        }
        else if (element.category == 'open space' || element.category == 'Park') {
            tabs.openSpaceTab.push(content)
        }
        else if (element.category == 'hall') {
            tabs.hallTab.push(content)
        }
        return tabs

    }

    componentDidMount(){
        this.setState({placeOption: this.props.event.place})
    }

    render() {
        const labels = ['Private', 'Open Space', 'Hall']
        const tabs = {
            privateTab: [],
            openSpaceTab: [],
            hallTab: []
        }
        let content = null
        if (this.props.event.place != null && this.props.event.place != undefined) {
            content = <EditPlaceOption key={'chosenPlace' + this.props.event.place.id} event={this.props.event} placeOption={this.props.event.place} isChosen={true} updatePlaceDetails={this.updatePlaceDetails} removePlace={this.removePlace} />
            this.assignContentToTab(tabs, this.props.event.place, content)
        }
        this.props.eventsStore.places.forEach(element => {
            if (this.props.event.place == null || element.id != this.props.event.place.id) {
                content = <EditPlaceOption key={'notChosenPlace' + element.id} event={this.props.event} placeOption={element} isChosen={false} updatePlaceDetails={this.updatePlaceDetails} addPlace={this.addPlace}/>
                this.assignContentToTab(tabs, element, content)
            }
        })
        const contents = [tabs.privateTab, tabs.openSpaceTab, tabs.hallTab]
        return (
            <div>
                <FullWidthTabs labels={labels} content={contents} />
            </div>
        )
    }
}
export default inject("eventsStore")(observer(EditPlaceSection))