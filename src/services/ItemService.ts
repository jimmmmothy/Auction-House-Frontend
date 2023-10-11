import axios from 'axios';

const HOST_NAME = 'http://localhost:8080/items';

function GetAllItems() {
    return axios.get(HOST_NAME)
};

const ItemService = {
    GetAllItems
}

export default ItemService