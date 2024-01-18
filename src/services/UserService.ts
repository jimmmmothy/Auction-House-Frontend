import axios from 'axios';
import LOCALHOST from './Localhost';
import RegisterDTO from '../models/RegisterDTO';
import { AxiosResponse } from 'axios';

async function AddUser(body: RegisterDTO) : Promise<AxiosResponse<string>> {
    return axios.post(`${LOCALHOST}/register`, body)
                .then(res => { return res; })
                .catch(error => { throw new Error(error); })
};

async function AuthenticateUser(body: LoginDTO) : Promise<AxiosResponse<string>> {
    return axios.post(`${LOCALHOST}/login`, body)
                .then(res => { return res; })
                .catch(error => {
                    if (error.status === 401) {
                        throw new Error("401 Unauthorized"); 
                    }

                    throw error;
                    });
}

async function GetUserDetails(id: number) : Promise<AxiosResponse<RegisterDTO>> {
    return axios.get(`${LOCALHOST}/users/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    })
                .then(res => { return res; })
                .catch(error => { throw new Error(error); });
}

async function UpdateUserDetails(user: RegisterDTO) : Promise<AxiosResponse<boolean>> {
    return axios.put(`${LOCALHOST}/users/self/${user.id!}`, user, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    })
                .then(res => { return res; })
                .catch(error => { throw new Error(error); });
}

const UserService = {
    AddUser,
    AuthenticateUser,
    GetUserDetails,
    UpdateUserDetails
}

export default UserService