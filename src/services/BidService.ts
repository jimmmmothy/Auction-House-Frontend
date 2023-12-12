import axios from 'axios';
import LOCALHOST from './Localhost';
const HOST_NAME = `${LOCALHOST}/bids`;
import BidDTO from '../models/BidDTO';

async function PostBid(bid: BidDTO) : Promise<boolean> {
    return axios.post(HOST_NAME, bid)
        .then(res => { 
            if (res.status === 200)
                return true; 
            return false;
        })
        .catch(err => {
            console.log(err)
            return false;
        });
}

async function GetTop3Bids(itemId: number) : Promise<any> { 
    return axios.get(`${HOST_NAME}/${itemId}`)
        .then(res => { return res })
        .catch(err => {
            console.log(err)
        });
}

const BidService = {
    PostBid,
    GetTop3Bids
}

export default BidService;