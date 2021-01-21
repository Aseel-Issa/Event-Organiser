import React, { Component } from 'react';

class Place extends Component {
    render() {
        const place = this.props.place
        return(
            <div className="place">
                <h1>Place</h1>
                <div className="place-details">
                <div>
                    <div>
                        <h3>Type: </h3>
                        <span>{place.category}</span>
                    </div>
                    <div>
                        <h3>Name: </h3>
                        <span>{place.name}</span>
                    </div>
                    <div>
                        <h3>Phone: </h3>
                        <span>{place.phone}</span>
                    </div>
                    <div>
                        <h3>Address: </h3>
                        <span>{place.address}</span>
                    </div>
                    <div>
                        <h3>Price: </h3>
                        <span>{place.price}</span>
                    </div>
                    <div>
                    <h3>special comments: </h3>
                    <span>{place.specialComments}</span>
                </div>
                </div>
                    <img src={place.img} />
                </div>
            </div>
        )
    }
}

export default Place;