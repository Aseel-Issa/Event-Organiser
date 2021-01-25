import {observable, makeObservable} from 'mobx'


class Theme {

    constructor(id, title, isChosen, mainImg, images, category){
        this.id = id
        this.category = category
        this.title = title
        this.isChosen = isChosen
        this.mainImg = mainImg
        this.images = images

        makeObservable(this, {
            title: observable,
            category: observable,
            isChosen: observable,
            mainImg: observable,
            images: observable
        })
    }
}

export default Theme