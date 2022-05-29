import { loginout } from "../mobx/account";
import { request } from "./request";

const loginAPI = (data) => {
    return request("post", "/account/login", data).then((x) => {
        if(x.data === "no user found" || x.data === "Incorrect Password Entered") {
            return false
        }

        loginout.setLogin(x.data)
        return true
    })

}

const registerAPI = (data) => {
    return request("post", "/account/register", data).then((response) =>
        console.log(response)
    )
}


export { loginAPI, registerAPI }