import { jwtDecode } from "jwt-decode";
import Item from "../models/ItemRequest";
import ItemService from "./ItemService";

const CheckAuthenticated = (): boolean => {
    const token = localStorage.getItem('jwt');

    if (!token) {
        document.location.assign('/login')

        return false;
    }

    return true;
};

const CheckAuthorized = async (itemId: number): Promise<boolean> => {
    const token = localStorage.getItem("jwt");
    if (token === null) {
        return false;
    }

    const decodedToken = jwtDecode(token) as { [key: string]: any };
    return ItemService.GetItem(itemId)
        .then(data => {
            const item = data as Item

            if (item.postedByUserId == decodedToken.sub) {
                return true;
            }

            return false;
        })
        .catch(error => {
            console.log(error);
            return false;
        });
}

const GetLoggedInUserId = () : number => {
    const token = localStorage.getItem("jwt");
    if (token === null) {
        return -1;
    }

    const decodedToken = jwtDecode(token) as { [key: string]: any };
    return parseInt(decodedToken.sub);
}

export default {
    CheckAuthenticated,
    CheckAuthorized,
    GetLoggedInUserId
};
