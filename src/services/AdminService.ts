import axios from 'axios';
import LOCALHOST from './Localhost';
import RegisterDTO from '../models/RegisterDTO';
const HOST_NAME = `${LOCALHOST}/users`;

async function GetAllUsers() : Promise<RegisterDTO[] | boolean> {
    return axios.get(HOST_NAME, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(res => { 
            if (res.status === 200)
                return res.data
            
            if (res.status === 403)
                return false;

            return []
        })
        .catch(err => {
            console.log(err);
        });
}

async function MakeAdmin(userId: number) : Promise<boolean> {
    return axios.put(`${HOST_NAME}/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(res => { 
            if (res.status === 200) 
                return true;

            return false;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
}

async function DeleteUser(userId: number) : Promise<boolean> {
    return axios.delete(`${HOST_NAME}/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(res => {
            if (res.status === 200) 
                return true;

            return false;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
}

export default {
    GetAllUsers,
    MakeAdmin,
    DeleteUser
}