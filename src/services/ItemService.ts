import axios from 'axios';
import LOCALHOST from './Localhost';
import Item from '../models/ItemRequest';

const HOST_NAME = `${LOCALHOST}/items`;

function GetAllItems() {
    return axios.get(HOST_NAME)
};

function GetItem(id: number) {
    return axios.get(`${HOST_NAME}/${id}`);
}

function PostItem(item: Item) {
    axios.post(HOST_NAME, item)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

function DeleteItem(itemId: number) {
    axios.delete(`${HOST_NAME}/${itemId}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error)
    })
}

const ItemService = {
    GetAllItems,
    GetItem,
    PostItem,
    DeleteItem
}

export default ItemService