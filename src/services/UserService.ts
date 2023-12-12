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
                .catch(error => { throw new Error(error); });
}

const UserService = {
    AddUser,
    AuthenticateUser
}

export default UserService