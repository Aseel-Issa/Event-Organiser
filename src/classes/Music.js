import {observable, makeObservable} from 'mobx'


class Music {

    constructor(category, name, phone, price, img, specialComments){
        this.category = category
        this.name = name
        this.phone = phone
        this.price = price
        this.img = img
        this.specialComments = specialComments

        makeObservable(this, {
            category: observable,
            name: observable,
            phone: observable,
            price: observable,
            img: observable,
            specialComments: observable
        })
    }
}

export default Music