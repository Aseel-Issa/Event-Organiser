import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import FullWidthTabs from './FullWidthTabs'
import EditMusicOption from './EditMusicOption'

class EditMusicSection extends Component {

    constructor() {
        super()
        this.state = {
            musicOptions: [],
            MusicChosen: []
        }
    }

    componentDidMount() {
        console.log('in cimponentDidMount of the EditFoodSection')
        this.setState({ MusicChosen: this.props.event.musicList })
        let finalMusicOptions = []

        this.props.eventsStore.musicList.forEach(element => {
            console.log('event: '+JSON.stringify(this.props.event))
            let item = this.props.event.musicList.filter(e => {
                return e.id == element.id
            })
            if (item.length == 0) {
                finalMusicOptions.push(element)
            }
        });
        this.setState({ musicOptions: finalMusicOptions })

    }

    updateEventMusicList = () => {
        let newEvent = { ...this.props.event }
        newEvent.musicList = []
        this.state.MusicChosen.forEach(element => newEvent.musicList.push(element))
        this.props.updateEventState(newEvent)
    }

    updateChosenMusicDetails = (musicOption) => {
        let newEvent = { ...this.props.event }
        let index = newEvent.musicList.findIndex(element => { return element.id == musicOption.id })
        // we are only interested in the chosen items
        // generates a bug when trying to add a modified music option to list
        if (index != -1) {
            newEvent.musicList[index] = { ...musicOption }
            this.props.updateEventState(newEvent)
        }
    }

    trasnferMusicFromOptions = (musicOption) => {
        console.log('In trasnferMusicFromOptions')
        let newMusicOptions = []
        this.state.musicOptions.forEach(element => {
            if (element.id != musicOption.id) {
                newMusicOptions.push(element)
            }
        })
        let newMusicChosen = this.state.MusicChosen.map(element => { return element })
        newMusicChosen.push(musicOption)
        this.setState({
            musicOptions: newMusicOptions,
            MusicChosen: newMusicChosen
        }, () => {
            this.updateEventMusicList()
            this.props.eventsStore.addMusicOptionToEvent(this.props.event, musicOption)
        })


    }

    trasnferMusicFromChosen = (musicOption) => {
        let newMusicOptions = this.state.musicOptions.map(element => { return element })
        let newMusicChosen = []
        this.state.MusicChosen.forEach(element => {
            if (element.id != musicOption.id) {
                newMusicChosen.push(element)
            }
        })
        newMusicOptions.push(musicOption)
        this.setState({
            musicOptions: newMusicOptions,
            MusicChosen: newMusicChosen
        }, () => {
            this.updateEventMusicList()
            this.props.eventsStore.removeMusicOptionFromEvent(this.props.event, musicOption)
        })

    }

    assignContentToTab(tabs, element, content) {
        if (element.category == 'D.J') {
            tabs.djTab.push(content)
        }
        else if (element.category == 'Singer') {
            tabs.singerTab.push(content)
        }
        else if (element.category == 'Band') {
            tabs.bandTab.push(content)
        }
        return tabs

    }

    render() {
        const labels = ['D.J', 'Singer', 'Band']
        const tabs = {
            djTab: [],
            singerTab: [],
            bandTab: []
        }
        let content = null
        this.state.MusicChosen.forEach(element => {
            content = <EditMusicOption key={'chosenMusic' + element.id} event={this.props.event} musicOption={element} isChosen={true} moveToOptions={this.trasnferMusicFromChosen} updateMusicDetails={this.updateChosenMusicDetails} />
            this.assignContentToTab(tabs, element, content)
        })
        this.state.musicOptions.forEach(element => {
            content = <EditMusicOption key={'notChosenMusic' + element.id} event={this.props.event} musicOption={element} isChosen={false} moveToChosen={this.trasnferMusicFromOptions} updateMusicDetails={this.updateChosenMusicDetails} />
            this.assignContentToTab(tabs, element, content)
        })
        const contents = [tabs.djTab, tabs.singerTab, tabs.bandTab]
        return (
            <div>
                <FullWidthTabs labels={labels} content={contents} />
            </div>
        )
    }
}
export default inject("eventsStore")(observer(EditMusicSection))