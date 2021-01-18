import {observable, makeObservable} from 'mobx'


class Organiser {

    constructor(id, name, phone, email){
        this.id = id
        this.name = name
        this.phone = phone
        this.email = email

        makeObservable(this, {
            name: observable,
            phone: observable,
            email: observable
        })
    }
}

export default Organiser