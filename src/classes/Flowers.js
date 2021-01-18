import {observable, makeObservable} from 'mobx'


class Flowers {

    constructor(table, entry, stands){
        this.table = table
        this.entry = entry
        this.stands = stands

        makeObservable(this, {
            table: observable,
            entry: observable,
            stands: observable
        })
    }
}

export default Flowers