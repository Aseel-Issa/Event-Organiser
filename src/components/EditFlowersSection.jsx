
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';


class EditFlowersSection extends Component {
    constructor() {
        super()
        this.state = {
            savedRosesData: null,
            flowersType: '',
            flowersOnTable: false,
            flowersOnTablePrice: 0,
            flowersOnEntryDoor: false,
            flowersOnEntryDoorPrice: 0,
            NumberOfFlowersStands: 0,
            flowersStandsPRice: 0
        }
    }

    componentDidMount() {
        console.log(this.props.event.flowers.category)
        if (this.props.event.flowers != null && this.props.event.flowers != undefined) {
            this.setState({
                savedRosesData: {...this.props.event.flowers},
                flowersType: this.props.event.flowers.category,
                flowersOnTable: this.props.event.flowers.table.onTable,
                flowersOnTablePrice: this.props.event.flowers.table.price,
                flowersOnEntryDoor: this.props.event.flowers.entry.onEntry,
                flowersOnEntryDoorPrice: this.props.event.flowers.entry.price,
                NumberOfFlowersStands: this.props.event.flowers.stands.numOfStands,
                flowersStandsPRice: this.props.event.flowers.stands.price
            })
        }
    }

    handleFlowersType = (e) => {
        this.setState({ flowersType: e.target.value}, ()=> {
            let newFlowersDetails
            if (e.target.value == this.state.savedRosesData.category){
                newFlowersDetails = {...this.state.savedRosesData}
                this.setState({
                    flowersOnTablePrice: this.state.savedRosesData.table.price,
                    flowersOnEntryDoorPrice: this.state.savedRosesData.entry.price,
                    flowersStandsPRice: this.state.savedRosesData.stands.price
                }, this.updateFlowersDetails(newFlowersDetails))
            }else{
                const element = this.props.eventsStore.flowers.filter(element => { return e.target.value == element.category})
                if(element.length!=0){
                    newFlowersDetails = {
                        //'Rose', {onTable: true, price: 50}, {onEntry: true, price: 1500}, {numOfStands: 6, price: 150}
                        category: this.state.flowersType,
                        table: {
                            onTable: this.state.flowersOnTable,
                            price: this.state.flowersOnTablePrice
                        },
                        entry: {
                            onEntry: this.state.flowersOnEntryDoor,
                            price: this.state.flowersOnEntryDoorPrice
                        },
                        stands: {
                            numOfStands: this.state.NumberOfFlowersStands,
                            price: this.state.flowersStandsPRice
                        }
                    }
                    this.setState({
                        flowersOnTablePrice: element[0].onTablePrice,
                        flowersOnEntryDoorPrice: element[0].onEntryPrice,
                        flowersStandsPRice: element[0].standPrice
                    }, this.updateFlowersDetails(newFlowersDetails))
                }
                }
            })
        
    }

    updateFlowersDetails = (flowersDetails) => {
        let newEvent = { ...this.props.event }
        newEvent.flowers = { ...flowersDetails }
        this.props.updateEventState(newEvent)
    }

    handleOnTable= (e) => {
        const newFlowersDetails = {
            category: this.state.flowersType,
            table: {
                onTable: !(this.state.flowersOnTable),
                price: this.state.flowersOnTablePrice
            },
            entry: {
                onEntry: this.state.flowersOnEntryDoor,
                price: this.state.flowersOnEntryDoorPrice
            },
            stands: {
                numOfStands: this.state.NumberOfFlowersStands,
                price: this.state.flowersStandsPRice
            }
        }
        this.setState({ flowersOnTable: !this.state.flowersOnTable }, this.updateFlowersDetails(newFlowersDetails))
    }
    handleOnEntry= (e) => {
        const newFlowersDetails = {
            category: this.state.flowersType,
            table: {
                onTable: this.state.flowersOnTable,
                price: this.state.flowersOnTablePrice
            },
            entry: {
                onEntry: !this.state.flowersOnEntryDoor,
                price: this.state.flowersOnEntryDoorPrice
            },
            stands: {
                numOfStands: this.state.NumberOfFlowersStands,
                price: this.state.flowersStandsPRice
            }
        }
        this.setState({ flowersOnEntryDoor: !this.state.flowersOnEntryDoor }, this.updateFlowersDetails(newFlowersDetails))
    }

    handleStandsNumber = (e) =>{
        const newFlowersDetails = {
            category: this.state.flowersType,
            table: {
                onTable: this.state.flowersOnTable,
                price: this.state.flowersOnTablePrice
            },
            entry: {
                onEntry: !this.state.flowersOnEntryDoor,
                price: this.state.flowersOnEntryDoorPrice
            },
            stands: {
                numOfStands: e.target.value,
                price: this.state.flowersStandsPRice
            }
        }
        this.setState({NumberOfFlowersStands: e.target.value}, this.updateFlowersDetails(newFlowersDetails))
    }

    render() {
        return (
            <table className='flowersSection'>
                <tbody>
                    <tr>
                        <td>Main flowers type in decoration</td>
                        <td><select value={this.state.flowersType} onChange={this.handleFlowersType}>
                            <option value="Tulip">Tulip</option>
                            <option value="Rose">Rose</option>
                            {/* <option value="ANTHURIUM">ANTHURIUM</option>
                                <option value="HYACINTH">HYACINTH</option>
                                <option value="RANUNCULUS">RANUNCULUS</option> */}
                        </select></td>
                    </tr>
                    <tr>
                        <td>Flowers on table</td>
                        <td><FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.flowersOnTable}
                                    onChange={this.handleOnTable}
                                    name="checkedOnTable"
                                    color="primary"
                                />
                            }
                            label="Primary"
                        /></td>
                        <td>price/table</td>
                        <td>{this.state.flowersOnTablePrice}₪</td>
                    </tr>
                    <tr>
                        <td>Flowers on entry door</td>
                        <td><FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.flowersOnEntryDoor}
                                    onChange={this.handleOnEntry}
                                    name="checkedOnEntry"
                                    color="primary"
                                />
                            }
                            label="Primary"
                        /></td>
                        <td>price</td>
                        <td>{this.state.flowersOnEntryDoorPrice}₪</td>
                    </tr>
                    <tr>
                        <td>Number of flowers stands</td>
                        <td><TextField InputLabelProps={{ shrink: true}} type="number" onChange={this.handleStandsNumber} value={this.state.NumberOfFlowersStands} /></td>
                        <td>price/stand</td>
                        <td>{this.state.flowersStandsPRice}₪</td>
                    </tr>
                </tbody>
            </table>
        )
    }

}
export default inject("eventsStore")(observer(EditFlowersSection))