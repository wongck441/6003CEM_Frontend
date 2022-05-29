import { types } from 'mobx-state-tree'

const loginout = types
    .model({
        name: types.string,
        type: types.string,
        apiToken: types.string
    })
    .views(self => ({
        isCharityWorker() {
            return self.type === "charity worker"
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
            self.name = data.name
            self.type = data.type
            self.apiToken = data.apiToken
        },
        setLogout() {
            self.name = ""
            self.type = ""
            self.apiToken = ""
        }
    }))
    .create({
        name: "alex",
        type: "charity worker",
        apiToken: "AAAAAAAAAKKKKKKKKKEOA"
    })

export { loginout }