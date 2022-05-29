import axios from "axios"

const backendServer = "http://localhost:3090"

async function request(method, url, body) {
    async function requestAPI() {
        if (method === "get") {
            return axios({
                method: 'get',
                url: `${backendServer}${url}`,
                responseType: 'json'
            }).then((x) => x)
        } else {
            return axios({
                method: 'post',
                url: `${backendServer}${url}`,
                data: body
            }).then((x) => x)
        }
    }

    try {
        let response = await requestAPI()
        return response
    } catch (err) {
        console.error(err)
    }
}

export { request }