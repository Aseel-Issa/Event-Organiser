import {observable, makeObservable} from 'mobx'


class Flowers {
    constructor(id, category, table, entry, stands){
        this.id = id
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