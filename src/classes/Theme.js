import {observable, makeObservable} from 'mobx'


class Theme {

    constructor(title, isChosen, mainImg, images){
        this.title = title
        this.isChosen = isChosen
        this.mainImg = mainImg
        this.images = images

        makeObservable(this, {
            title: observable,
            isChosen: observable,
            mainImg: observable,
            images: observable
        })
    }
}

export default Theme