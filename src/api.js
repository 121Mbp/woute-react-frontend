import axios from 'axios'

let baseURL = ''
const hostname = window && window.location && window.location.hostname

if(hostname === 'localhost') {
    baseURL = 'http://localhost:8081'
}

export const wouteAPI = async (api, method, params) => {    
    try {
        const response = await axios({
            method: method,
            url: baseURL + api,
            data: params
        })
        return response
    } catch (error) {
        throw error
    }
}