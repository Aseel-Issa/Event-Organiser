import {observable, makeObservable} from 'mobx'


class Music {

    constructor(category, name, phone, price, img, specialComments, isChosen){
        this.category = category
        this.name = name
        this.phone = phone
        this.price = price
        this.img = img
        this.specialComments = specialComments
        this.isChosen = isChosen

        makeObservable(this, {
            category: observable,
            name: observable,
            phone: observable,
            price: observable,
            img: observable,
            specialComments: observable,
            isChosen: observable
        })
    }
}

export default Music