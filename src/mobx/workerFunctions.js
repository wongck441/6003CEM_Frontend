import { types } from 'mobx-state-tree'

const editDogInfo = types
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

export { editDogInfo }