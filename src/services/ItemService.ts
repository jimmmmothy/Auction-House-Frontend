import axios from 'axios';
import LOCALHOST from './Localhost';

const HOST_NAME = `${LOCALHOST}/items`;

function GetAllItems() {
    return axios.get(HOST_NAME)
};

function GetItem(id: number) {
    return axios.get(`${HOST_NAME}/${id}`);
}

const ItemService = {
    GetAllItems,
    GetItem
}

export default ItemService