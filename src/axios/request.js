import axios from "axios"

const backendServer = "http://localhost:3090"

function post(url, body) {
    return axios({
        method: 'post',
        url: `${backendServer}${url}`,
        data: body
    }).then((x) => x)
}

function get(url) {
    return axios({
        method: 'get',
        url: `${backendServer}${url}`,
        responseType: 'json'
    })
}

async function request(method, url, body) {
    async function requestAPI() {
        method === "get" ? get(url) : post(url, body)
    }

    try {
        let response = await requestAPI()
        return response
    } catch (err) {
        console.error(err)
    }
}

export { request }