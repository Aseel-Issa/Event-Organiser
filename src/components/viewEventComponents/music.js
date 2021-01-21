import React, { Component } from 'react';

class Music extends Component {
    render() {
        const music = this.props.music
        return(
            <div className="music">
                <h1>Music</h1>
                <div className="music-details">
                <div>
                    <div>
                        <h3>Type: </h3>
                        <span>{music.category}</span>
                    </div>
                    <div>
                        <h3>Name: </h3>
                        <span>{music.name}</span>
                    </div>
                    <div>
                        <h3>Phone: </h3>
                        <span>{music.phone}</span>
                    </div>
                    <div>
                        <h3>Price: </h3>
                        <span>{music.price}</span>
                    </div>
                </div>
                <div>
                    <h3>special comments: </h3>
                    <span>{music.specialComments}</span>
                </div>
                </div>
            </div>
        )
    }
}

export default Music;