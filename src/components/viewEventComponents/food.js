import React, { Component } from 'react';
import Tabs from './tabs'
import FoodItem from './foodItem'

class Food extends Component {
    getCategories(){
        let categories = {}
        for(let f of this.props.food){
          if(f.category in categories){
            categories[f.category].push(f)
          }else {
            categories[f.category] = [f]
          }
        }
        return categories
      }

      foodItems(categories, categoryName){
          if(categories[categoryName]){
            return categories[categoryName].map(i => {return <FoodItem item={i} />})
          }
        
      }

    render() {
        const categories = this.getCategories()
        return(
            <div className="food">
                <h1>Food</h1>
                <Tabs> 
       <div label="Sweets"> 
          {this.foodItems(categories, "Sweets")}
       </div> 
       <div label="Dinner"> 
          {this.foodItems(categories, "Dinner")}
       </div> 
       <div label="Appetizers"> 
          {this.foodItems(categories, "Appetizers")}
       </div> 
       <div label="Snacks">
          {this.foodItems(categories, "Snacks")}
       </div>
     </Tabs>
            </div>
        )

    }
}

export default Food;