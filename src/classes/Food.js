import {observable, makeObservable} from 'mobx'


class Food {

    constructor(category, name, ingredients, quantity, price, img, specialComments){
        this.category = category
        this.name = name
        this.quantity = quantity
        this.ingredients = ingredients
        this.price = price
        this.img = img
        this.specialComments = specialComments

        makeObservable(this, {
            category: observable,
            name: observable,
            quantity: observable,
            ingredients: observable,
            price: observable,
            img: observable,
            specialComments: observable
        })
    }
}

export default Food