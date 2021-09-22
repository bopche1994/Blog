import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://vbblog.herokuapp.com/api/"
})