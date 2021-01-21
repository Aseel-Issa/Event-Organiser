import {observable, makeObservable} from 'mobx'

class Event {

    constructor(client, status, title, occasion, date, startHour, endHour, numOfGuests, themes, food, flowers, music, place, organiser){
        this.client = client
        this.status = status
        this.title = title
        this.occasion = occasion
        this.date = date
        this.startHour = startHour
        this.endHour = endHour
        this.numOfGuests = numOfGuests
        this.themes = themes
        this.food = food
        this.flowers = flowers
        this.music = music
        this.place = place
        this.organiser = organiser

        makeObservable(this, {
            client: observable,
            status: observable,
            title: observable,
            occasion: observable,
            date: observable,
            startHour: observable,
            endHour: observable,
            numOfGuests: observable,
            themes: observable,
            food: observable,
            flowers: observable,
            music: observable,
            place: observable,
            organiser: observable
        })
    }
}

export default Event