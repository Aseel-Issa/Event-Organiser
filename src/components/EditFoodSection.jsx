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

    componentDidMount(){
        console.log('in cimponentDidMount of the EditFoodSection')
        this.setState({foodChosen: this.props.event.food})
        let finalFoodOptions = []

        this.props.eventsStore.food.forEach(element => {
            let item = this.props.event.food.filter(e => {
                return e.id == element.id
            })
            if(item.length == 0){
                finalFoodOptions.push(element)
            }
        });
        this.setState({foodOptions: finalFoodOptions})
        
    }

    updateEventFoodList = () => {
        let newEvent = {...this.props.event}
        newEvent.food = []
        this.state.foodChosen.forEach(element => newEvent.food.push(element))
        // console.log('newEvent')
        // console.log(newEvent)
        this.props.updateEventState(newEvent)
    }

    updateChosenFoodDetails = (food) => {
        let newEvent = {...this.props.event}
        let index = newEvent.food.findIndex(element => {return element.id == food.id})
        // we are only interested in the chosen items
        if(index!=-1){
            newEvent.food[index] = {...food}
            this.props.updateEventState(newEvent)
        }
    }

    trasnferFoodFromOptions = (food) => {
        // console.log('in trasnferFoodFromOptions')
        let newFoodOptions = []
        this.state.foodOptions.forEach(element => {
            if(element.id != food.id) {
                newFoodOptions.push(element)
                }
            })
        let newFoodChosen = this.state.foodChosen.map(element => {return element})
        newFoodChosen.push(food)
        // console.log('newFoodChosen '+ JSON.stringify(newFoodChosen))
        this.setState({
            foodOptions: newFoodOptions,
            foodChosen: newFoodChosen
        }, () => {
            this.updateEventFoodList()
            this.props.eventsStore.addFoodToList(this.props.event, food)
        })
        
    
    }

    trasnferFoodFromChosen = (food) => {
        let newFoodOptions = this.state.foodOptions.map(element => {return element})
        let newFoodChosen =  []
        this.state.foodChosen.forEach(element => {
            if(element.id != food.id) {
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

    render(){
        // console.log('chosen list: '+JSON.stringify(this.state.foodChosen))
        // console.log('options list: '+JSON.stringify(this.state.foodOptions))
        const labels = ['Sweets', 'Main Dish', 'Appetiser']
        const sweetsTab = []
        const mainDishTab = []
        const appetiserTab = []
        let content = null
        this.state.foodChosen.forEach(element => {
            // console.log('element is: '+JSON.stringify(element))
            content = <EditFoodOption key={'chosen'+element.id} event={this.props.event} food={element} isChosen={true} moveToOptions={this.trasnferFoodFromChosen} updateFoodDetails={this.updateChosenFoodDetails}/>
            if(element.category == 'sweets'){
                sweetsTab.push(content)
            }
            else if(element.category == 'Dinner'){
                mainDishTab.push(content)
            }
            else if(element.category == 'appetiser'){
                appetiserTab.push(content)
            }
        })
        this.state.foodOptions.forEach(element => {
            content = <EditFoodOption key={'notChosen'+element.id} event={this.props.event} food={element} isChosen={false} moveToChosen={this.trasnferFoodFromOptions}  updateFoodDetails={this.updateChosenFoodDetails}/>
            if(element.category == 'sweets'){
                sweetsTab.push(content)
            }
            else if(element.category == 'Dinner'){
                mainDishTab.push(content)
            }
            else if(element.category == 'appetiser'){
                appetiserTab.push(content)
            }
        })
        const contents = [sweetsTab, mainDishTab, appetiserTab]
        return(
            <div>
                <FullWidthTabs labels={labels} content={contents}/>
            </div>
        )
    }
}
export default inject("eventsStore")(observer(EditFoodSection))