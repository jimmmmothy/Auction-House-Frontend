import axios from 'axios';
import LOCALHOST from './Localhost';
import Item from '../models/ItemRequest';

const HOST_NAME = `${LOCALHOST}/items`;

async function GetAllItems() : Promise<Item[]> {
    return axios.get(HOST_NAME)
};

async function GetItem(id: number) : Promise<Item> {
    return axios.get(`${HOST_NAME}/${id}`)
        .then(res => res.data)
        .catch(error => console.log(error))
}

async function PostItem(item: Item) : Promise<Item | null> {
    return axios.post(HOST_NAME, item)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

async function EditItem(itemId : number, item : Item) : Promise<void> {
    axios.put(`${HOST_NAME}/${itemId}`, item, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .catch(error => {
            console.log(error)
        })
}

async function DeleteItem(itemId: number) : Promise<void> {
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
    EditItem,
    DeleteItem
}

export default ItemService