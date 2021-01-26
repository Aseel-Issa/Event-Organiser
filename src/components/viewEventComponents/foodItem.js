import React, { Component } from 'react';

class FoodItem extends Component {
    render() {
        const item = this.props.item
        return(
            <div className="food-item">
                <div>
                <h2>{item.name}</h2>
                <div>
                    <h3>Ingredients: </h3>
                    <span>{item.ingredients}</span>
                </div>
                <div>
                    <div>
                        <h3>Quantity/Dish: </h3>
                        <span>{item.quantity}</span>
                    </div>
                    <div>
                        <h3>Price/Dish: </h3>
                        <span>{item.price}</span>
                    </div>
                </div>
                <div>
                    <h3>special comments: </h3>
                    <span>{item.specialComments}</span>
                </div>
                </div>
                <div>
                    <img src={item.img}></img>
                </div>
                
            </div>
        )
    }
}

export default FoodItem;