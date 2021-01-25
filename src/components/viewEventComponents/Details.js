import React, { Component } from 'react';

class Details extends Component {
    render() {
        const details = this.props.details
        return (
            <div className="details">
                <div className="title">
                    <h2>{details.title}</h2>
                </div>
                <div></div>
                <div className="client">
                    <div className="name">Client: {details.client.name} </div>
                    <div className="phone">Phone: {details.client.phone} </div>
                    <div className="email">Email: {details.client.email} </div>
                    <div className="address">Address: {details.client.address} </div>
                </div>
                <div className="time">
                    <div className="date">Date of Event: {details.date} </div>
                    <div className="Shour">Start hour: {details.startHour} </div>
                    <div className="Ehour">End hour: {details.endHour} </div>
                </div>
                <div className="guestsNum">Number of guests: {details.numOfGuests} </div>
            </div>
        );
    }
}

export default Details;