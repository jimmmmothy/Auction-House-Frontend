import axios from 'axios';
import LOCALHOST from './Localhost';
import RegisterDTO from '../models/RegisterDTO';

function AddUser(body: RegisterDTO) {
    return axios.post(`${LOCALHOST}/register`, body)
};

function AuthenticateUser(body: LoginDTO) {
    return axios.post(`${LOCALHOST}/login`, body);
}

const UserService = {
    AddUser,
    AuthenticateUser
}

export default UserService