
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import ThemePopup from './ThemePopup'

class Theme extends Component {

    constructor(){
        super()
        this.state = {
            openPopup:  false
        }
    }

    viewPopup = () => {
        this.setState({openPopup: true})
    }

    closePopup = () => {
        this.setState({openPopup: false})
    }

    updateEvent = (theme) => {
        this.props.changeTheme(theme)
    }
    
    render(){
        let text
        if (this.props.theme.isChosen){
            text = <div class="chosenTheme">(Chosen)</div>
        }
        let popup
        if (this.state.openPopup){
            popup = <ThemePopup closePopup={this.closePopup} theme={this.props.theme} updateEvent={this.updateEvent}/>
        }else{
            popup = null
        }
        // to be changed later
        return(<td className="ThemeRow">
            <img src={this.props.theme.mainImg} onClick={this.viewPopup}></img>
            <div class="centered">{this.props.theme.title}</div>
            {text}
            {popup}
        </td>)
    }

}
export default inject("eventsStore")(observer(Theme))