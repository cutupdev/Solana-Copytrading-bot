import axios from 'axios'
import { io } from 'socket.io-client'
import * as clipboard from 'clipboard-polyfill';
import { message } from 'antd';

const handleCopyToClipboard = (address: any) => {
  clipboard.writeText(address);
  message.success(address);
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const RPC = import.meta.env.VITE_MAIN_RPC

const post = async (additionUrl: String, data: any) => {
    console.log(BACKEND_URL)
    return await axios.post(`${BACKEND_URL}${additionUrl}`, data)
}

const get = async (additionUrl: String) => {
    return await axios.get(`${BACKEND_URL}${additionUrl}`)
}

const socketIo = io(import.meta.env.VITE_BACKEND_SOCKET_URL)


export {
    post,
    get,
    RPC,
    socketIo,
    handleCopyToClipboard
}