import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import EventCard from "./EventCard";
import { Route, withRouter } from 'react-router-dom';

class MarketPlace extends Component {
    constructor(){
        super()
        this.state = {
            occasionFilter: 'All',
            searchStr: '',
            cardsToShow: []
        }
    }

    async componentDidMount() {
        await this.props.marketplaceStore.loadMarketplaceDummyData()
        this.setState({
            cardsToShow:  this.props.marketplaceStore.events
        })
    }

    assignEventRequest = (event) => {
        this.props.marketplaceStore.assignEventRequest(event)
    }

    filterByOccasion = (e) => {
        this.setState({
            occasionFilter: e.target.value})

    }

    search = (e) => {
        this.setState({
            searchStr: e.target.value
        })
    }

    viewEvent = (event) => {
        // Route to view event page
        console.log(event)
        this.props.history.push({
            pathname: '/viewEvent',
            state: { eventId: event.id}
        });
    }

    render() {
        const cards = this.state.cardsToShow.map(element=> {
            if(element == null || element == undefined){
                return null
            }
            if((element.occasion.toLowerCase() == this.state.occasionFilter.toLowerCase() ||  this.state.occasionFilter == 'All')&& (element.client.address.toLowerCase().includes(this.state.searchStr.toLowerCase()) || this.state.searchStr=='')){
                return <div className='card' key={'div-' + element.id}><EventCard display={true} key={element.id} event={element} assignEventRequest={this.assignEventRequest} userType={this.props.marketplaceStore.userType} showAssignmentBtn={true} viewEvent={this.viewEvent}/></div>
            }
            else{
                return null
            }
        })
        return (
            <div class='pageContent'>
            <label>Occasion</label> &nbsp;&nbsp;
                <select value={this.state.occasion} onChange={this.filterByOccasion}>
                    <option value="All">All</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Engagement">Engagement</option>
                    <option value="baptism">baptism</option>
                </select>
                &nbsp;&nbsp;&nbsp;
                <input placeholder='search on address' value={this.state.searchStr} onChange={this.search}></input>
                <hr></hr>
                {cards}
            </div>)
    }
}

export default withRouter(inject("marketplaceStore")(observer(MarketPlace)))