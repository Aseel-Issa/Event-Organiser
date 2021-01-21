import {observable, makeObservable} from 'mobx'


class Flowers {

    constructor(category, table, entry, stands, image){
        this.category = category
        this.table = table
        this.entry = entry
        this.stands = stands
        this.Img = image

        makeObservable(this, {
            category: observable,
            table: observable,
            entry: observable,
            stands: observable,
            Img: observable
        })
    }
}

export default Flowers