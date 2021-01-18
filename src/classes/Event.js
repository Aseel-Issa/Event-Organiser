class Event {

    constructor(client, status, title, occasion, date, startHour, endHour, numOfGuests, theme, food, flowers, music, place, organiser){
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
            theme: observable,
            food: observable,
            flowers: observable,
            music: observable,
            place: observable,
            organizer: observable
        })
    }
}

export default Event