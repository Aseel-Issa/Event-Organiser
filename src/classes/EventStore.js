import { observable, makeObservable, action } from 'mobx'
import axios from 'axios'
import Event from './Event'
import Client from './Client';
import Theme from './Theme';
import Food from './Food';
import Flowers from './Flowers';
import Music from './Music';
import Place from './Place';
import Organiser from './Organiser';

class EventStore {
    constructor() {
        this.events = []
        this.client = null
        this.userType = ''
        this.themes = []
        this.food = []
        this.musicList = []
        this.places = []
        this.flowers = []

        makeObservable(this, {
            events: observable,
            userType: observable,
            themes: observable,
            food: observable,
            musicList: observable,
            flowers: observable,
            places: observable,
            loadAllEvents: action,
            updateEvent: action,
            loadDummyDataToStore: action,
            removeFoodFromList: action,
            addFoodToList: action,
            LoadAllFoodOptions: action,
            LoadAllMusicOptions: action,
            LoadAllPlacesOptions: action
        })
    }

    getClient(){
        const client = new Client('1', 'Johne Smith', '050-123-456', 'johnesmith@gmail.com', 'Jerusalem, Old city, 1234')
        return client
        // to be return this.client
    }

    async loadDummyDataToStore(){
        console.log('start loadDummyDataToStore')
        await this.LoadAllFoodOptions()
        await this.LoadAllThemes('wedding')
        await this.LoadAllPlacesOptions()
        await this.LoadAllMusicOptions()
        await this.LoadAllFlowerTypes()
        console.log('end loadDummyDataToStore')


        this.userType = 'client'

        const client = new Client('1', 'Johne Smith', '050-123-456', 'johnesmith@gmail.com', 'Jerusalem, Old city, 1234')
        this.client = client
       
    //     const themes = []
    //     const images1 = []
    //     images1.push('/images/cinderella1.jpeg')
    //     images1.push('/images/cinderella2.jpg')
    //     images1.push('/images/cinderella3.jpg')
    //     images1.push('/images/cinderella4.jpg')
    //     const theme1 = new Theme('1', 'Cinderella', true, '/images/cinderella1.jpeg', images1, 'wedding')
    //     themes.push(theme1)
       
    //     const images2 = []
    //     images2.push('/images/hawaiian1.jpg')
    //     images2.push('/images/hawaiian2.jpeg')
    //     const theme2 = new Theme('2', 'hawaiian', false, '/images/hawaiian1.jpg', images2, 'wedding')
    //     themes.push(theme2)
        
    //     this.themes = themes

    //     const food = []
    //     const meal1 = new Food('1', 'Dinner', 'Sea Food', 'Shrimps, Calamari, Noodles and Tomato sauce', 100, 120, '/images/sea-food.jpg', 'Add dill to the recipe', true, null)
    //     food.push(meal1)
    //     const meal2 = new Food('2', 'Dinner', 'Barbecue', 'Dead meat, Chicken', 100, 85, '/images/barbecue.jpg', null, true, null)
    //     food.push(meal2)

    //     const sweets1 = new Food('3', 'sweets', 'cupcake', '', null, 5, '/images/cupcake1.jpeg', '', false, 'Oreo')

    //     this.food.push(meal1)
    //     this.food.push(meal2)
    //     this.food.push(sweets1)
        
    //     const flower1 = new Flowers('1', 'Rose', {onTable: true, price: 50}, {onEntry: true, price: 1500}, {numOfStands: 6, price: 150})
    //     const flowerType1 = {
    //         id: '1',
    //         category: 'Rose',
    //         onTablePrice: 50,
    //         onEntryPrice: 1500,
    //         standPrice: 150
    //     }
    //     this.flowers.push(flowerType1)
    //     const flowerType2 = {
    //         id: '2',
    //         category: 'Tulip',
    //         onTablePrice: 80,
    //         onEntryPrice: 1900,
    //         standPrice: 200
    //     }
    //     this.flowers.push(flowerType2)

    //     const musicList = []
    //     const music1 = new Music('1', 'D.J', 'Toam Sawyer', '052-123-1234', 2000, '/images/undefindMale.png', 'Please include these songs:1 .... 2 .... 3 ....', true)
    //     musicList.push(music1)
    //     const music2 = new Music('2', 'D.J', 'Sara Anderson', '052-345-6789', 2200, '/images/undefinedFemale.png', null, false)
    //     musicList.push(music2)
    //     this.musicList.push(music1)
    //     this.musicList.push(music2)

    //     // const places = []
    //    // id, category, name, phone, address, price, img, specialComments, isChosen
    //     const place1 = new Place('1', 'open space', 'Bell Park', '052-123-1234', 'Jerusalem, Tal Piot', 15000, '/images/bellPark.jpg', null, true)
    //     this.places.push(place1)
    //     const place2 = new Place('2', 'hall', 'Kedma Midtown', '052-123-1234', 'Yad Harutsim St 22, Jerusalem', 15000, '/images/place2.jpeg', null, true)
    //     this.places.push(place2)
    //     const place3 = new Place('3', 'private', 'My house', '052-123-1234', 'Beit hanena, Jerusalem', 0, '/images/undefinedPlace.png', null, true)
    //     this.places.push(place3)

    //     const organiser = new Organiser('1', 'Aseel Issa', '054-123-1234', 'fake-email@gmail.com')
    //     const event = new Event('1',client, 'Negotiation', `Johne & Mary's Wedding`, 'Wedding', '2021-04-01', '20:00', '00:00', 100, theme1, food, flower1, musicList, place1, organiser)
    //     this.events.push(event)
    }

    // This function should get all the events of the logged in user
    async loadAllEvents(userId){
        let results
        if(this.userType == 'client'){
            results = await axios.get(`http://localhost:3001/events/client/:${userId}`)
        }else{
            results = await axios.get(`http://localhost:3001/events/organiser/:${userId}`)
        }
        // console.log(results)
        this.events = results.map(element => {
            return new Event(element)
        })
    }

    // updates an event from the client side and reflects it to the database too
    async updateEvent(newEvent){
        try{
            const result =  await axios.put(`http://localhost:3001/event`, newEvent)
            if(result){
                const eventIndex = this.events.findIndex(element => {return element.id == newEvent.id})
                this.events[eventIndex] = newEvent
                return true
            }
        }catch(e){
            console.log('Changes was not save to database')
            console.log(e)
        }finally{
            return false
        }
    }

    async createEvent(event){
        const newEvent = {...event}
        newEvent.client = event.client.id
        newEvent.theme= event.theme? event.theme.id : null
        newEvent.food = event.food.map(element => {
            return {id: element.id, price: element.price}
        })
        newEvent.musicList = event.musicList.map(element => {
            return {id: element.id, price: element.price}
        })
        const flowersId= this.flowers.find(element => {
            return element.category == event.flowers.category
        })
        newEvent.flowers = {
            id: flowersId,
            table: event.flowers.table,
            entry: event.flowers.entry,
            stands: event.flowers.stands
        }
        newEvent.place = event.place.id
        newEvent.organiser = event.organizer? event.organizer.id: null

        console.log('created event: '+JSON.stringify(newEvent))
        
        try{
            // post request should return the id of the created event
            //  const result =  await axios.post(`http://localhost:3001/event`, newEvent)
            // if(result){
            //     const eventIndex = this.events.findIndex(element => {return element.id == newEvent.id})
            //  //   this.events[eventIndex].id = result.id
            // //  return result.id
            //     return true
            // }
        }catch(e){
            console.log('Changes was not save to database')
            console.log(e)
        }finally{
            return false
        }
    }

    assignClient(client){
        this.client = client
        this.userType = 'client'
        this.loadAllEvents(client.id)
    }

    assignOrganiser(organiser){
        this.organiser = organiser
        this.userType = 'organiser'
        this.loadAllEvents(organiser.id)
    }

    async LoadAllThemes(category){
        console.log('LoadAllThemes')
        const results= await axios.get(`http://localhost:2011/theme/${category}`)
        console.log(results)
        this.themes= results.data.map(element => {
            let newElement = {...element}
            newElement.id = element._id
            return newElement
        })
    }

    // async LoadClientInfo(userId){
    //     this.client= await axios.get(`http://localhost:3001/client/${userId}`)
    // }

    async LoadAllFoodOptions(){
         const results= await axios.get(`http://localhost:2011/food`)
         this.food = results.data.map(element => {
            let newElement = {...element}
            newElement.id = element._id
            return newElement
        })
    }

    async LoadAllPlacesOptions(){
         const results= await axios.get(`http://localhost:2011/place`)
         this.places = results.data.map(element => {
            let newElement = {...element}
            newElement.id = element._id
            return newElement
        })
    }

    async LoadAllMusicOptions(){
        // console.log('LoadAllMusicOptions')
        const results = await axios.get(`http://localhost:2011/music`)
        // console.log(results)
        this.music = results.data.map(element => {
            let newElement = {...element}
            newElement.id = element._id
            return newElement
        })
    }
    async LoadAllFlowerTypes(){
        const results = await axios.get(`http://localhost:2011/flower`)
        console.log(results)
        this.flowers = results.data.map(element => {
            let newElement = {...element}
            newElement.id = element._id
            return newElement
        })
   }

    removeFoodFromList(event, food){
        const eventIndex = this.events.findIndex(element => {return element.id == event.id})
        const foodIndex = this.events[eventIndex].food.findIndex(element => {return element.id == food.id})
        this.events[eventIndex].food.splice(foodIndex, 1)
    }

    addFoodToList(event, food){
        const index = this.events.findIndex(element => {return element.id == event.id})
        this.events[index].food.push(food)
    }

    addMusicOptionToEvent(event, music){
        const index = this.events.findIndex(element => {return element.id == event.id})
        this.events[index].musicList.push(music)
    }

    removeMusicOptionFromEvent(event, music){
        const eventIndex = this.events.findIndex(element => {return element.id == event.id})
        const musicIndex = this.events[eventIndex].musicList.findIndex(element => {return element.id == music.id})
        this.events[eventIndex].musicList.splice(musicIndex, 1)
    }

    // updates the store with the new changes, but does not send the changes to the database yet
    // We save everything at onse in the updateEvent method
    changeTheme(event, theme){
        const updated = this.events.find(element => { return element.id == event.id})
        const index = this.events.findIndex(element => { return element.id == event.id})
        console.log(index)
        const newTheme = this.themes.find(element => { return element.id == theme.id})
        newTheme.isChosen=true
        console.log(newTheme)
        const oldTheme = this.themes.find(element => { return element.id == updated.theme.id})
        oldTheme.isChosen=false
        updated.theme = newTheme
        console.log(oldTheme)
        this.events[index] = updated
    }

}
export default EventStore