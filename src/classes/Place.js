class Place {

    constructor(category, name, phone, address, price, img, specialComments){
        this.category = category
        this.name = name
        this.phone = phone
        this.address = address
        this.price = price
        this.img = img
        this.specialComments = specialComments

        makeObservable(this, {
            category: observable,
            name: observable,
            phone: observable,
            address: observable,
            price: observable,
            img: observable,
            specialComments: observable
        })
    }
}

export default Place