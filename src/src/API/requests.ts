import axios from "axios";
import {TSendWorklogsData} from "../Data/WorkLogsReducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/1.0/'
})


export type TDefRes = {
    resultCode : number
    messages: Array<string>
    data : any
}

export const API = {
    async SendWorklogBlock(WorklogData : TSendWorklogsData) {
        const response = await instance.post<TDefRes>(`Worklogs`,WorklogData)
        return response.data
    }
}

