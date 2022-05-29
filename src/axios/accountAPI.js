import { loginout } from "../mobx/account";
import { request } from "./request";

const loginAPI = (data) => {
    return request("post", "/account/login", data).then((response) => {
        console.log(response)
        loginout.setLogin(response.data)
    })

}

const registerAPI = (data) => {
    return request("post", "/account/register", data).then((response) =>
        console.log(response)
    )
}


export { loginAPI, registerAPI }