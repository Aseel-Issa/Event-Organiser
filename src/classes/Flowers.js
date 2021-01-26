import {observable, makeObservable} from 'mobx'


class Flowers {
    constructor(id, category, table, entry, stands, img){
        this.id = id
        this.category = category
        this.table = table
        this.entry = entry
        this.stands = stands
        this.img = img

        makeObservable(this, {
            category: observable,
            table: observable,
            entry: observable,
            stands: observable,
            img: observable
        })
    }
}

export default Flowers