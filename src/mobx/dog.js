import { types } from 'mobx-state-tree'

const dogDetails = types
    .model({
        id: types.number,
        name: types.string,
        breed: types.string,
        dob: types.string,
        gender: types.number,
        location: types.string,
        description: types.string,
        image: types.string
    })
    .actions(self => ({
        setData(data) {
            self.id = data.id
            self.name = data.name
            self.breed = data.breed
            self.dob = data.dob
            self.gender = data.gender
            self.location = data.location
            self.description = data.description
            self.image = data.image
        }
    }))
    .create({
        id: -1,
        name: "",
        breed: "",
        dob: "",
        gender: 0,
        location: "",
        description: "",
        image: ""
    })

const dogInfoListBody = types
    .model({
        id: types.number,
        name: types.string,
        breed: types.string,
        dob: types.string,
        gender: types.number,
        location: types.string,
        description: types.string,
        image: types.string
    })

const dogInfoList = types
    .model({
        infoList: types.array(dogInfoListBody)
    })
    .views(self => ({
        filter(breed, gender, location) {
            return breed !== "" ? self.infoList.filter(x => x.breed.toLowerCase().includes(breed.toLowerCase())) :
                gender !== "" ? self.infoList.filter(x => x.gender === gender) :
                location !== "" ? self.infoList.filter(x => x.location.toLowerCase() === location.toLowerCase()) : self.infoList
        }
    }))
    .actions(self => ({
        fillList(data) {
            self.clearList()
            data.forEach(info =>
                self.infoList.push(info)
            )
        },
        deleteDogData(index) {
            console.log(index)
            self.infoList.splice(index, 1)
        },
        clearList() {
            self.infoList.clear()
        }
    }))
    .create({
        infoList: []
    })

export { dogDetails, dogInfoList }