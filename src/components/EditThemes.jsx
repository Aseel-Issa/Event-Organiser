import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Theme from './Theme';


class EditThemes extends Component {
    constructor() {
        super()
        this.state = {
            toDisplayThemes:[],
            current: 0
        }
    }

    fillThemes(){
        let themes = []
        for(let i=this.state.current; i<this.props.eventsStore.themes.length; i++){
            if(this.state.current+i==3){
                break;
            }
            themes.push(this.props.eventsStore.themes[i])
        }
        this.setState({toDisplayThemes: themes})
    }

    componentDidMount(){
        this.fillThemes()
    }

    moveLeft = () =>{
        if(this.state.current!=0){
            this.setState({current: this.state.current-1}, this.fillThemes())
        }

    }

    moveRight = () => {
        if(this.state.current!=this.props.eventsStore.themes.length-1){
            this.setState({current: this.state.current+1}, this.fillThemes())
        }
    }

    changeTheme = (theme) => {
        this.props.eventsStore.changeTheme(this.props.event, theme)
    }

    render() {
        const allThemes = this.state.toDisplayThemes.map(element => { return <Theme theme={element} key={element.id} changeTheme={this.changeTheme}/> })
        // console.log(JSON.stringify(allThemes))

        return (<table>
            <tbody>
                <tr>
            {/* Display up to three themes */}
            <td><button className='arrows' onClick={this.moveLeft}>{'<'}</button></td>
            {allThemes}
            <td><button className='arrows' onClick={this.moveRight}>{'>'}</button></td>
            </tr>
            </tbody>
        </table>)
    }

}
export default inject("eventsStore")(observer(EditThemes))