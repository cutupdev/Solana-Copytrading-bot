import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const RPC = import.meta.env.VITE_MAIN_RPC

const post = async (additionUrl: String, data: any) => {
    console.log(BACKEND_URL)
    return await axios.post(`${BACKEND_URL}${additionUrl}`, data)
}

const get = async (additionUrl: String) => {
    return await axios.get(`${BACKEND_URL}${additionUrl}`)
}

export {
    post,
    get,
    RPC
}