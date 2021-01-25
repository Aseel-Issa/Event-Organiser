import React, { Component } from 'react';

class Theme extends Component {
    render() {
        const theme = this.props.theme
        return(
            <div className="themes">
                <h1>Theme</h1>
                <div className="themes-details">
                <div>
                <h2>{theme.title}</h2>
                <div className="main-img">
                    <img src={theme.mainImg}></img>
                    
                </div>
                </div>
                <div className="images">
                    {theme.images.map(i => {return <img src={i}/>})}
                </div>
                </div>
            </div>
        )
    }
}

export default Theme;