import axios from 'axios';
import LOCALHOST from './Localhost';

const HOST_NAME = `${LOCALHOST}/items`;

function GetAllItems() {
    return axios.get(HOST_NAME)
};

const ItemService = {
    GetAllItems
}

export default ItemService