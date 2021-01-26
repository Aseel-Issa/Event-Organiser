import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import TimePicker from './TimePicker';
import DatePicker from './DatePicker'
import TextField from '@material-ui/core/TextField';


class EditDetails extends Component {

    constructor() {
        super()
        this.state = {
            titleInput: '',
            occasion: '',
            startHour: '',
            endHour: '',
            date:''
        }
    }

    componentDidMount() {
        this.setState({
            occasion: this.props.event.occasion,
            startHour: this.props.event.startHour,
            endHour: this.props.event.endHour,
            date: this.props.event.date,
            guests: this.props.event.numOfGuests,
            titleInput: this.props.event.title
        })
    }

    handleTitle = (e) => {
        const newEvent = {...this.props.event}
        newEvent.title = e.target.value
        this.setState({
            titleInput: e.target.value
        }, this.props.updateEventState(newEvent))
    }

    handleStartHour = (hour) => {
        const newEvent = {...this.props.event}
        newEvent.startHour = hour
        this.setState({
            startHour: hour
        }, this.props.updateEventState(newEvent))
    }

    handleEndHour = (hour) => {
        const newEvent = {...this.props.event}
        newEvent.endHour = hour
        this.setState({
            endHour: hour
        }, this.props.updateEventState(newEvent))
    }

    handleDate = (date) => {
        const newEvent = {...this.props.event}
        newEvent.date = date
        this.setState({
            date: date
        }, this.props.updateEventState(newEvent))
    }

    handleOccasion = (e) => {
        const newEvent = {...this.props.event}
        newEvent.occasion = e.target.value
        this.setState({
            occasion: e.target.value
        }, async() => {await this.props.eventsStore.LoadAllThemes(e.target.value)
            this.props.updateEventState(newEvent)
            this.props.updateThemeList()})
    }

    handleGuests = (e) => {
        const newEvent = {...this.props.event}
        newEvent.guests = e.target.value
        this.setState({
            guests: e.target.value
        }, this.props.updateEventState(newEvent))
    }

    render() {
        let organiserName = null
        let organiserPhone = null
        let organiserEmail = null
        if(this.props.event.organiser != null && this.props.event.organiser!=undefined ){
            organiserName = (<td>{this.props.event.organiser.name}</td>)
            organiserPhone = (<td>{this.props.event.organiser.phone}</td>)
            organiserEmail = (<td>{this.props.event.organiser.email}</td>)
        }
        let clientName = null
        let clientPhone = null
        let clientEmail = null
        let clientAddress = null
        if(this.props.event.client != null && this.props.event.client!=undefined ){
            clientName = (<td>{this.props.event.client.name}</td>)
            clientPhone = (<td>{this.props.event.client.phone}</td>)
            clientEmail = (<td>{this.props.event.client.email}</td>)
            clientAddress = (<td>{this.props.event.client.address}</td>)
        }
        return (
            <div>
                <br></br>
                <label className='status'><p>{this.props.event.status}</p></label>
                <br></br>
            <table>
                <tbody>
                    <tr className='info'>
                        <td>Title</td>
                        <td><input value={this.state.titleInput} onChange={this.handleTitle} placeholder='Type the name of your event'></input></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>

                        <td>Client</td>
                        {clientName}
                        <td>Organiser</td>
                        {organiserName}
                    </tr>
                    <tr>

                        <td>Phone</td>
                        {clientPhone}
                        <td>Phone</td>
                        {organiserPhone}
                    </tr>
                    <tr>

                        <td>Email</td>
                        {clientEmail}
                        <td>Email</td>
                        {organiserEmail}
                    </tr>
                    <tr>
                        <td>address</td>
                        {clientAddress}
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Occasion</td>
                        <td>
                            <select value={this.state.occasion} onChange={this.handleOccasion}>
                                <option value="Wedding">Wedding</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Graduation">Graduation</option>
                                <option value="Engagement">Engagement</option>
                                <option value="baptism">baptism</option>
                            </select>
                        </td>
                        <td>Date</td>
                        <td><DatePicker date={this.state.date} updateDate={this.handleDate}/></td>
                    </tr>
                    <tr>
                        <td>Start hour</td>
                        <td><TimePicker hour={this.state.startHour} updateHour={this.handleStartHour}/></td>
                        <td>End hour</td>
                        <td><TimePicker hour={this.state.endHour} updateHour={this.handleEndHour}/></td>
                    </tr>
                    <tr>
                        <td>Number of guests</td>
                        <td><TextField InputLabelProps={{ shrink: true}} type="number" onChange={this.handleGuests} value={this.state.guests} /></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            </div>

        )
    }



}

export default inject("eventsStore")(observer(EditDetails))