import {observable, makeObservable} from 'mobx'

class Place {

    constructor(category, name, phone, address, price, img, specialComments, isChosen){
        this.category = category
        this.name = name
        this.phone = phone
        this.address = address
        this.price = price
        this.img = img
        this.specialComments = specialComments
        this.isChosen = isChosen

        makeObservable(this, {
            category: observable,
            name: observable,
            phone: observable,
            address: observable,
            price: observable,
            img: observable,
            specialComments: observable,
            isChosen: observable
        })
    }
}

export default Place