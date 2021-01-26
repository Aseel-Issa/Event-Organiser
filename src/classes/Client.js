
import {observable, makeObservable} from 'mobx'


class Client {

    constructor(id, name, phone, email, address, messages){
        this.id = id
        this.name = name
        this.phone = phone
        this.email = email
        this.address = address

        makeObservable(this, {
            name: observable,
            phone: observable,
            email: observable,
            address: observable
        })
    }
}

export default Client