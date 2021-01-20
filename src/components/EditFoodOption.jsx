

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

class EditFoodOption extends Component {

    constructor() {
        super()
        this.state = {
            numOfServings: 0,
            specialComment: '',
            flavor: '',
            price: 0,
            isChosen: false,
            food: undefined
        }
    }

    componentDidMount() {
        // id, category, name, ingredients, quantity, price, img, specialComments, isChosen, flavor
        this.setState(
            {
                numOfServings: this.props.food.quantity,
                specialComment: this.props.food.specialComments,
                flavor: this.props.food.flavor,
                price: this.props.food.price,
                isChosen: this.props.isChosen,
                food: this.props.food
            }
        )
    }

    handlePrice = (e) => {
        let newFood = {...this.state.food}
        newFood.price = e.target.value
        this.setState({ price: e.target.value }, this.props.updateFoodDetails(newFood))
    }

    handleSpecialComment = (e) => {
        let newFood = {...this.state.food}
        newFood.specialComments = e.target.value
        this.setState({ specialComment: e.target.value }, this.props.updateFoodDetails(newFood))
    }

    handleNumberOfServings = (e) => {
        let newFood = {...this.state.food}
        newFood.quantity = e.target.value
        this.setState({ numOfServings: e.target.value, food: newFood }, this.props.updateFoodDetails(newFood))
    }

    handleFlavor = (e) => {
        let newFood = {...this.state.food}
        newFood.flavor = e.target.value
        this.setState({ flavor: e.target.value }, this.props.updateFoodDetails(newFood))
    }

    removeFoodFromList = () => {
        // this.props.moveToOptions(this.props.food)
        this.props.moveToOptions(this.state.food)
    }

    addFoodToList = () => {
        // this.props.moveToChosen(this.props.food)
        this.props.moveToChosen(this.state.food)
    }

    // id, category, name, ingredients, quantity, price, img, specialComments, isChosen, flavor
    render() {
        // console.log(JSON.stringify(this.props.food))
        let ingredients = null
        let flavor = null
        const food = this.props.food
        if (food.ingredients != null && food.ingredients !='') {
            ingredients = (<tr>
                <td>Ingredients:</td>
                <td>{food.ingredients}</td>
            </tr>)
        }
        if (food.flavor != null && food.flavor!="") {
            flavor = (<tr>
                <td>Flavor:</td>
                <td><select value={this.state.flavor} onChange={this.handleFlavor}>
                    <option value="Nutella">Nutella</option>
                    <option value="Strawberry">Strawberry</option>
                    <option value="Orange">Orange</option>
                    <option value="Lemon">Lemon</option>
                    <option value="Oreo">Oreo</option>
                </select></td>
            </tr>)
        }
        let price = null
        let actionBtn = null
        // User is either a client or an organiser
        if (this.props.eventsStore.userType == 'client') {
            price = (<tr>
                <td>Price per serving</td>
                <td>{food.price} ₪</td>
            </tr>)
            if (this.state.isChosen) {
                actionBtn = <Button className='tabBtn' onClick={this.removeFoodFromList}>Remove</Button>
            } else {
                actionBtn = <Button className='tabBtn' onClick={this.addFoodToList}>Add</Button>
            }
        } else {
            price = (<tr>
                <td>Price per serving</td>
                <td><TextField InputLabelProps={{ shrink: true }} type="number" onChange={this.handlePrice} value={this.state.price} /></td>
            </tr>)
        }
        return (
            <table class="food-option" data-id={food.id}>
            <tr>
                <td class='food-details'>
                    <table>
                        <tbody>
                            <tr>
                                <td>{food.name}</td>
                                <td></td>
                            </tr>
                            {ingredients}
                            {flavor}
                            <tr>
                                <td>Serving quantity</td>
                                <td><TextField InputLabelProps={{ shrink: true }} type="number" onChange={this.handleNumberOfServings} value={this.state.numOfServings} /></td>
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
                    <img src={food.img}></img>
                </td>
                <td class='food-actions'>
                    {actionBtn}
                </td>
            </tr>
            </table>
        )
    }
}
export default inject("eventsStore")(observer(EditFoodOption))