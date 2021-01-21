import React, { Component } from 'react';
import Tabs from './tabs'
import FlowersItem from './flowersItem'

class Food extends Component {
    getCategories(){
        let categories = {}
        for(let f of this.props.flowers){
          if(f.category in categories){
            categories[f.category].push(f)
          }else {
            categories[f.category] = [f]
          }
        }
        return categories
      }

      flowersItems(categories, categoryName){
          if(categories[categoryName]){
            return categories[categoryName].map(i => {return <FlowersItem item={i} />})
          }
        
      }

    render() {
        const categories = this.getCategories()
        const labels = Object.keys(categories)
        return(
            <div className="flowers">
                <h1>Flowers</h1>
                <Tabs> 
                    {labels.map(l => {return <div label={l}> 
          {this.flowersItems(categories, l)}
       </div>})}
     </Tabs>
            </div>
        )

    }
}

export default Food;