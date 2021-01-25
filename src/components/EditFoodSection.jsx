import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import FullWidthTabs from './FullWidthTabs'
import EditFoodOption from './EditFoodOption';


class EditFoodSection extends Component {

    constructor() {
        super()
        this.state = {
            foodOptions: [],
            foodChosen: []
        }
    }

    componentDidMount() {
        console.log('in cimponentDidMount of the EditFoodSection')
        this.setState({ foodChosen: this.props.event.food })
        let finalFoodOptions = []

        this.props.eventsStore.food.forEach(element => {
            let item = this.props.event.food.filter(e => {
                return e.id == element.id
            })
            if (item.length == 0) {
                finalFoodOptions.push(element)
            }
        });
        this.setState({ foodOptions: finalFoodOptions })

    }

    updateEventFoodList = () => {
        let newEvent = { ...this.props.event }
        newEvent.food = []
        this.state.foodChosen.forEach(element => newEvent.food.push(element))
        this.props.updateEventState(newEvent)
    }

    updateChosenFoodDetails = (food) => {
        let newEvent = { ...this.props.event }
        let index = newEvent.food.findIndex(element => { return element.id == food.id })
        // we are only interested in the chosen items
        // generates a bug when trying to add a modified food option to list
        if (index != -1) {
            newEvent.food[index] = { ...food }
            this.props.updateEventState(newEvent)
        }
    }

    trasnferFoodFromOptions = (food) => {
        let newFoodOptions = []
        this.state.foodOptions.forEach(element => {
            if (element.id != food.id) {
                newFoodOptions.push(element)
            }
        })
        let newFoodChosen = this.state.foodChosen.map(element => { return element })
        newFoodChosen.push(food)
        this.setState({
            foodOptions: newFoodOptions,
            foodChosen: newFoodChosen
        }, () => {
            this.updateEventFoodList()
            this.props.eventsStore.addFoodToList(this.props.event, food)
        })


    }

    trasnferFoodFromChosen = (food) => {
        let newFoodOptions = this.state.foodOptions.map(element => { return element })
        let newFoodChosen = []
        this.state.foodChosen.forEach(element => {
            if (element.id != food.id) {
                newFoodChosen.push(element)
            }
        })
        newFoodOptions.push(food)
        this.setState({
            foodOptions: newFoodOptions,
            foodChosen: newFoodChosen
        }, () => {
            this.updateEventFoodList()
            this.props.eventsStore.removeFoodFromList(this.props.event, food)
        })

    }

    assignContentToTab(tabs, element, content) {
        if (element.category == 'sweets') {
            tabs.sweetsTab.push(content)
        }
        else if (element.category == 'Dinner') {
            tabs.mainDishTab.push(content)
        }
        else if (element.category == 'appetiser') {
            tabs.appetiserTab.push(content)
        }
        return tabs

    }

    render() {
        const labels = ['Sweets', 'Main Dish', 'Appetiser']
        const tabs = {
            sweetsTab: [],
            mainDishTab: [],
            appetiserTab: []
        }
        let content = null
        this.state.foodChosen.forEach(element => {
            content = <EditFoodOption key={'chosenFood' + element.id} event={this.props.event} food={element} isChosen={true} moveToOptions={this.trasnferFoodFromChosen} updateFoodDetails={this.updateChosenFoodDetails} />
            this.assignContentToTab(tabs, element, content)
        })
        this.state.foodOptions.forEach(element => {
            content = <EditFoodOption key={'notChosenFood' + element.id} event={this.props.event} food={element} isChosen={false} moveToChosen={this.trasnferFoodFromOptions} updateFoodDetails={this.updateChosenFoodDetails} />
            this.assignContentToTab(tabs, element, content)
        })
        const contents = [tabs.sweetsTab, tabs.mainDishTab, tabs.appetiserTab]
        return (
            <div>
                <FullWidthTabs labels={labels} content={contents} />
            </div>
        )
    }
}
export default inject("eventsStore")(observer(EditFoodSection))