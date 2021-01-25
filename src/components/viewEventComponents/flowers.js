import React, { Component } from 'react';
import { FaCheck, FaTimes } from "react-icons/fa";

class Flowers extends Component {
  render() {
    const flowers = this.props.flowers
    const onTable = flowers.table.onTable
    const onEntry = flowers.entry.onEntry
    let yes = <FaCheck /> 
    let no = <FaTimes />
    let onTableIcon, onEntryIcon
    onTable ? onTableIcon = yes : onTableIcon = no
    onEntry ? onEntryIcon = yes : onEntryIcon = no
    return(
      <div className="flowers">
        <h1>Flowers</h1>
        <div className="flowers-item">
               <div>
                   <span>Flowers on entry door {onEntryIcon}</span>
                   <span>Flowers on tables {onTableIcon}</span>
                   <span>Number of flower Stands {flowers.stands.numOfStands}</span>
               </div>
               <div>
                   <span>Price: {flowers.entry.price}</span>
                   <span>Price: {flowers.table.price}</span>
                   <span>Price/stand: {flowers.stands.price}</span>

               </div>
               <div>
                   <img src={flowers.Img} />
               </div>
            
        </div>
        </div>
    )
}
}

export default Flowers;