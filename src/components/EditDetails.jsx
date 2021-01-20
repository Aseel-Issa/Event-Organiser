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
        this.setState({
            titleInput: e.target.value
        })
    }

    handleStartHour = (hour) => {
        this.setState({
            startHour: hour
        })
    }

    handleEndHour = (hour) => {
        this.setState({
            endHour: hour
        })
    }

    handleDate = (date) => {
        this.setState({
            date: date
        })
    }

    handleOccasion = (e) => {
        this.setState({
            occasion: e.target.value
        }, this.props.eventsStore.LoadAllThemes())
    }

    handleGuests = (e) => {
        this.setState({
            guests: e.target.value
        })
    }

    render() {
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
                        <td>{this.props.event.client.name}</td>
                        <td>Organiser</td>
                        <td>{this.props.event.organiser.name}</td>
                    </tr>
                    <tr>

                        <td>Phone</td>
                        <td>{this.props.event.client.phone}</td>
                        <td>Phone</td>
                        <td>{this.props.event.organiser.phone}</td>
                    </tr>
                    <tr>

                        <td>Email</td>
                        <td>{this.props.event.client.email}</td>
                        <td>Email</td>
                        <td>{this.props.event.organiser.email}</td>
                    </tr>
                    <tr>
                        <td>address</td>
                        <td>{this.props.event.client.address}</td>
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