import {observable, makeObservable} from 'mobx'

class Event {
    constructor(id, client, status, title, occasion, date, startHour, endHour, numOfGuests, theme, food, flowers, musicList, place, organiser, assignmentRequests){
        this.id = id
        this.client = client
        this.status = status
        this.title = title
        this.occasion = occasion
        this.date = date
        this.startHour = startHour
        this.endHour = endHour
        this.numOfGuests = numOfGuests
        this.theme = theme
        this.food = food
        this.flowers = flowers
        this.musicList = musicList
        this.place = place
        this.organiser = organiser
        this.assignmentRequests = assignmentRequests

        makeObservable(this, {
            client: observable,
            status: observable,
            title: observable,
            occasion: observable,
            date: observable,
            startHour: observable,
            endHour: observable,
            numOfGuests: observable,
            theme: observable,
            food: observable,
            flowers: observable,
            musicList: observable,
            place: observable,
            organiser: observable,
            assignmentRequests: observable
        })
    }
}

export default Event