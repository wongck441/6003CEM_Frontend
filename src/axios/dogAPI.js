import { request } from "./request";
import { dogInfoList } from "../mobx/dog";

const getDogs = () => {
    return request("get", "/dog/getList").then((response) => {
        console.log(response)
        dogInfoList.fillList(response.data[1])
    })
}

const addDog = (data) => {
    console.log(data)
    return request("post", "/dog/add", data).then((response) => {
        getDogs()
    })
}

const editDog = (data) => {
    console.log(data)
    return request("post", "/dog/edit", data).then((response) => {
        getDogs()
    })
}

const deleteDog = (data) => {
    return request("post", "/dog/delete", data).then((response) => {
        getDogs()

    })
}


export { getDogs, editDog, deleteDog, addDog }