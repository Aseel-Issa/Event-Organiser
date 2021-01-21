import React, { Component } from 'react';
import { FaCheck, FaTimes } from "react-icons/fa";

class FlowersItem extends Component {
    render() {
        const item = this.props.item
        const onTable = item.table.onTable
        const onEntry = item.entry.onEntry
        let yes = <FaCheck /> 
        let no = <FaTimes />
        let onTableIcon, onEntryIcon
        onTable ? onTableIcon = yes : onTableIcon = no
        onEntry ? onEntryIcon = yes : onEntryIcon = no
        return(
            <div className="flowers-item">
                   <div>
                       <span>Flowers on entry door {onEntryIcon}</span>
                       <span>Flowers on tables {onTableIcon}</span>
                       <span>Number of flower Stands {item.stands.numOfStands}</span>
                   </div>
                   <div>
                       <span>Price: {item.entry.price}</span>
                       <span>Price: {item.table.price}</span>
                       <span>Price/stand: {item.stands.price}</span>

                   </div>
                   <div>
                       <img src={item.Img} />
                   </div>
                
            </div>
        )
    }
}

export default FlowersItem;