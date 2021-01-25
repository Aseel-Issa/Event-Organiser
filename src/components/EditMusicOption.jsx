

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

class EditMusicOption extends Component {

    constructor() {
        super()
        this.state = {
            specialComment: '',
            isChosen: false,
            musicOption: undefined
        }
    }

    componentDidMount() {
        // id, category, name, ingredients, quantity, price, img, specialComments, isChosen, flavor
        this.setState(
            {
                specialComment: this.props.musicOption.specialComments,
                isChosen: this.props.isChosen,
                musicOption: this.props.musicOption
            }
        )
    }

    handleSpecialComment = (e) => {
        let newMusicOption = {...this.state.musicOption}
        newMusicOption.specialComments = e.target.value
        this.setState({ specialComment: e.target.value }, this.props.updateMusicDetails(newMusicOption))
    }

    handlePrice = (e) => {
        let newMusicOption = {...this.state.musicOption}
        newMusicOption.price = e.target.value
        this.setState({ price: e.target.value }, this.props.updateMusicDetails(newMusicOption))
    }

    removeMusicOptionFromList = () => {
        this.props.moveToOptions(this.state.musicOption)
    }

    addMusicOptionToList = () => {
        console.log('In addMusicOptionFromList')
        this.props.moveToChosen(this.state.musicOption)
    }

    // id, category, name, phone, price, img, specialComments
    render() {
        if(this.state.musicOption == undefined){
            return null
        }
        const musicOption = this.state.musicOption
        let price = null
        let actionBtn = null
        // User is either a client or an organiser
        if (this.props.eventsStore.userType == 'client') {
            price = (<tr>
                <td>Price</td>
                <td>{musicOption.price} ₪</td>
            </tr>)
            if (this.state.isChosen) {
                actionBtn = <Button className='tabBtn' onClick={this.removeMusicOptionFromList}>Remove</Button>
            } else {
                actionBtn = <Button className='tabBtn' onClick={this.addMusicOptionToList}>Add</Button>
            }
        } else {
            price = (<tr>
                <td>Price</td>
                <td><TextField InputLabelProps={{ shrink: true }} type="number" onChange={this.handlePrice} value={this.state.price} /></td>
            </tr>)
        }
        return (
            <table class="food-option" data-id={musicOption.id}>
            <tr>
                <td class='food-details'>
                    <table>
                        <tbody>
                            <tr>
                                <td>{musicOption.name}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{musicOption.phone}</td>
                            </tr>
                            {price}
                            <tr>
                                <td>Special comments</td>
                                <td><textarea value={this.state.specialComment} onChange={this.handleSpecialComment}></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td class='food-image'>
                    <img src={musicOption.img}></img>
                </td>
                <td class='food-actions'>
                    {actionBtn}
                </td>
            </tr>
            </table>
        )
    }
}
export default inject("eventsStore")(observer(EditMusicOption))