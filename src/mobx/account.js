import { types } from 'mobx-state-tree'

const loginout = types
    .model({
        name: types.string,
        type: types.string,
        apiToken: types.string
    })
    .views(self => ({
        isCharityWorker() {
            return self.type === "charity_worker"
        },
        isLogedIn() {
            return self.name !== "" && self.type !== ""
        },
        currentUser() {
            return self.name
        },
        getAPItoken() {
            return self.apiToken
        }
    }))
    .actions(self => ({
        setLogin(data) {
            self.name = data[0].username
            self.type = data[0].usertype === null ? "_" : data[0].usertype
            self.apiToken = data[0].token === null ? "_" : data[0].token

            console.log({
                name: self.name,
                type: self.type,
                token: self.apiToken
            })
        },
        setLogout() {
            self.name = ""
            self.type = ""
            self.apiToken = ""
        }
    }))
    .create({
        name: "",
        type: "",
        apiToken: ""
    })

export { loginout }