import axios from 'axios';
import LOCALHOST from './Localhost';
import User from '../models/User';

function AddUser(body: User) {
    return axios.post(`${LOCALHOST}/register`, body)
};

const UserService = {
    AddUser
}

export default UserService