import {observable, makeObservable} from 'mobx'

class AssignmentRequest{
    constructor(organiser){
        this.organiser = organiser
        makeObservable(this, {
            organiser: observable
        })
    }

}

export default AssignmentRequest