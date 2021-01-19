import {observable, makeObservable} from 'mobx'


class Flowers {

    constructor(category, table, entry, stands){
        this.category = category
        this.table = table
        this.entry = entry
        this.stands = stands

        makeObservable(this, {
            category: observable,
            table: observable,
            entry: observable,
            stands: observable
        })
    }
}

export default Flowers