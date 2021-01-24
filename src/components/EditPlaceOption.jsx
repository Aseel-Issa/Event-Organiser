
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
            placeOption: undefined,
            name: '',
            address: '',
            phone: ''
        }
    }

    componentDidMount() {
        // id, category, name, phone, address, price, img, specialComments
        this.setState(
            {
                specialComment: this.props.placeOption.specialComments,
                isChosen: this.props.isChosen,
                placeOption: this.props.placeOption,
                name: this.props.placeOption.name,
                address: this.props.placeOption.address,
                phone: this.props.placeOption.phone
            }
        )
    }

    handlePrice = (e) => {
        let newPlaceOption = { ...this.state.placeOption }
        newPlaceOption.price = e.target.value
        this.setState({ price: e.target.value }, this.props.updatePlaceDetails(newPlaceOption))
    }
    handleSpecialComments = (e) => {
        let newPlaceOption = { ...this.state.placeOption }
        newPlaceOption.specialComments = e.target.value
        this.setState({ specialComments: e.target.value }, this.props.updatePlaceDetails(newPlaceOption))
    }
    handleName = (e) => {
        let newPlaceOption = { ...this.state.placeOption }
        newPlaceOption.name = e.target.value
        this.setState({ name: e.target.value }, this.props.updatePlaceDetails(newPlaceOption))
    }
    handleAddress = (e) => {
        let newPlaceOption = { ...this.state.placeOption }
        newPlaceOption.address = e.target.value
        this.setState({ address: e.target.value }, this.props.updatePlaceDetails(newPlaceOption))
    }

    handlePhone = (e) => {
        let newPlaceOption = { ...this.state.placeOption }
        newPlaceOption.phone = e.target.value
        this.setState({ phone: e.target.value }, this.props.updatePlaceDetails(newPlaceOption))
    }

    removePlace = () => {
        this.props.removePlace()
    }
    
    addPlace = () => {
        this.props.addPlace(this.state.placeOption)
    }

    render() {
        if (this.state.placeOption == undefined) {
            return null
        }
        const placeOption = this.state.placeOption
        let price = null
        let actionBtn = null
        let name = null
        let address = null
        let phone = null
        if (placeOption.category == 'private') {
            name = (<tr>
                <td>Place</td>
                <td><input onChange={this.handleName} value={this.state.name} /></td>
            </tr>)
            address = (<tr>
                <td>Address</td>
                <td><input onChange={this.handleAddress} value={this.state.address} /></td>
            </tr>)
            phone = (<tr>
                <td>Phone</td>
                <td><input onChange={this.handlePhone} value={this.state.phone} /></td>
            </tr>)
        } else {
            name = (<tr>
                <td>Address</td>
                <td>{placeOption.name}</td>
            </tr>)
            address = (<tr>
                <td>Address</td>
                <td>{placeOption.address}</td>
            </tr>)
            address = (<tr>
                <td>Phone</td>
                <td>{placeOption.phone}</td>
            </tr>)

        }
        // User is either a client or an organiser
        if (this.props.eventsStore.userType == 'client') {
            price = (<tr>
                <td>Price</td>
                <td>{placeOption.price} ₪</td>
            </tr>)
            if (this.state.isChosen) {
                actionBtn = <Button className='tabBtn' onClick={this.removePlace}>Remove</Button>
            } else {
                actionBtn = <Button className='tabBtn' onClick={this.addPlace}>Add</Button>
            }
        } else {
            price = (<tr>
                <td>Price</td>
                <td><TextField InputLabelProps={{ shrink: true }} type="number" onChange={this.handlePrice} value={this.state.price} /></td>
            </tr>)
        }
        return (
            <table class="food-option" data-id={placeOption.id}>
                <tr>
                    <td class='food-details'>
                        <table>
                            <tbody>
                                {name}
                                {address}
                                {phone}
                                {price}
                                <tr>
                                    <td>Special comments</td>
                                    <td><textarea value={this.state.specialComment} onChange={this.handleSpecialComments}></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td class='food-image'>
                        <img src={placeOption.img}></img>
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