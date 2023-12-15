import { useEffect, useState } from "react";
import { Client } from '@stomp/stompjs'
import Item from "../../models/ItemRequest";
import ItemService from "../../services/ItemService";
import { useParams } from "react-router-dom";
import "../../App.css"
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import CheckAuth from "../../services/CheckAuth";
import BidService from "../../services/BidService";
import BidDTO from "../../models/BidDTO";
import WebSocketService from "../../services/WebSocketService";
import PublicNotification from "../../models/PublicNotification";
import StompClient from "../../services/StompClient";

type RouterParams = {
    id: string;
}

let hasLoaded = false;

const ItemPage: React.FC = () => {
    const [item, setItem] = useState<Item>({
        id: 0,
        title: '',
        category: '',
        startingPrice: 0,
        currentBid: 0,
        description: '',
        postedByUserId: 0
    });
    const params = useParams<RouterParams>();
    const [description, setDescription] = useState<any>('');
    const [isCreator, setIsCreator] = useState<boolean>(false);
    const navigate = useNavigate();
    const [bidValue, setBidValue] = useState(0);
    const [loggedInUser, setLoggedInUser] = useState<number | undefined>();
    const [top3Bids, setTop3Bids] = useState<BidDTO[]>();
    const [client, setClient] = useState<Client>();

    useEffect(() => {
        const id = params.id!;
        let parsedId: number = parseInt(id, 10);

        BidService.GetBidsFromUser(CheckAuth.GetLoggedInUserId())
            .then((bidsFromUser) => {
                let client = StompClient.getStompClient();

                if (client) {
                    setClient(client);
                }
                else {
                    if (bidsFromUser) {
                        WebSocketService.setupStompClient(CheckAuth.GetLoggedInUserId(), bidsFromUser)
                            .then(res => {
                                StompClient.setStompClient(res);
                                setClient(res);
                            });
                    }
                    else {
                        WebSocketService.setupStompClient(CheckAuth.GetLoggedInUserId())
                            .then(res => {
                                StompClient.setStompClient(res);
                                setClient(res);
                            });
                    }
                }
            });

        ItemService.GetItem(parsedId).then(data => {
            setItem(data);
            setBidValue(data.currentBid > data.startingPrice ? data.currentBid : data.startingPrice);

            //checks if user is creator of the item
            let creatorId = data.postedByUserId;
            setLoggedInUser(CheckAuth.GetLoggedInUserId())

            if (CheckAuth.GetLoggedInUserId() === creatorId)
                setIsCreator(true);

            //description formatting
            let sliced: string = data.description.slice(1, item.description.length - 1);

            let replaced = sliced.replace(new RegExp("\\\\", 'g'), "");
            setDescription(JSON.parse(replaced));
        })
            .then(() => { hasLoaded = true })
            .catch(error => {
                if (error.response.status === 404) {
                    alert("This item cannot be found");
                    navigate('/');
                }
            });

        BidService.GetTop3Bids(parsedId).then(response => setTop3Bids(response.data));
    }, []);

    const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBidValue(parseInt(e.target.value));
    };

    const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (_: React.MouseEvent) => {
        confirm("Are you sure you want to delete this item?");
        ItemService.DeleteItem(item.id);
        navigate('/');
    }

    const handleUpdate: React.MouseEventHandler<HTMLButtonElement> = (_: React.MouseEvent) => {
        navigate(`/edit/${item.id}`);
    }

    const handlePlaceBid = async () => {
        if (!CheckAuth.CheckAuthenticated())
            return;

        if (loggedInUser !== undefined) {
            if (client) {
                await BidService.PostBid(new BidDTO(item.id, loggedInUser, bidValue));

                WebSocketService.sendNotification(client, new PublicNotification(item.id, `A bid has been placed on ${item.title}`));
            }
            else {
                alert('Something went wrong, please try again later');
            }

            // location.reload();
        }
    }


    return (
        <div className="container min-w-full px-4 md:px-10 pt-28 pb-4 md:pb-10 min-h-screen bg-transparent md:flex space-x-20">
            <div className="flex flex-col flex-grow">
                <div className="flex-grow flex space-x-10">
                    <div className="bg-orange-200 w-[200px] h-[200px] md:w-[400px] md:h-[400px] mb-10 border-2 border-black border-opacity-20 mr-auto">image placeholder</div>
                    <div className="flex flex-col text-right">
                        <h1 className="text-lg md:text-2xl font-bold mb-5 uppercase">{item.title}</h1>
                        <p className="mb-10">{item.category}</p>
                    </div>
                </div>
                <div className="flex flex-col flex-grow sm:mr-10 md:mx-0">
                    <table className="text-left bg-opacity-50 my-5">
                        <thead className="text-sm md:text-base uppercase bg-cyan-100">
                            <tr>
                                <th colSpan={2} className="px-6 py-3">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {hasLoaded ? Object.keys(description).map((key, _) => (
                                <tr key={key} className="text-s border-b-2 border-gray-100">
                                    <th className="px-6 py-2 font-medium first-letter:uppercase">
                                        {key}
                                    </th>
                                    <td>
                                        {Array.isArray(description[key]) ? description[key].join(', ') : description[key]}
                                    </td>
                                </tr>
                            )) :
                                <tr className="flex justify-center items-end h-16">
                                    <td>
                                        <Loader />
                                    </td>
                                </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-cyan-200 w-60 h-72 md:w-80 md:h-fit flex flex-col rounded-xl bg-opacity-20 items-left px-10 border-black border-2 border-opacity-20">
                <h1 className="text-base md:text-xl font-semibold my-5">Starting price: €{item.startingPrice}</h1>
                <h1 className="text-base md:text-xl font-semibold mb-auto">Current bid: €{item.currentBid}</h1>

                <ul className="my-5">
                    {top3Bids?.map((bid, index) => (
                        <li key={index} className="text-sm md:text-base">Anonymous - €{bid.bidAmount}</li>
                    ))}
                </ul>

                <button className={`${isCreator ? 'bg-emerald-500 w-1/3 self-end py-2 lg:py-3 mb-4' : 'hidden'}`} onClick={handleUpdate}>Edit</button>
                <button className={`${isCreator ? 'bg-red-500 w-1/3 self-end py-2 lg:py-3 mb-4' : 'hidden'}`} onClick={handleDelete}>Delete</button>
                <div className={`${isCreator ? 'hidden' : 'flex'}`}>
                    <span>Min bid</span>
                    <input
                        type="number"
                        className="mx-auto"
                        min={item.startingPrice}
                        max={item.startingPrice + 500}
                        step={10}
                        value={bidValue}
                        onChange={handleBidChange}
                    />
                    <span>Max bid</span>
                </div>
                <input
                    type="range" className={`${isCreator ? 'hidden' : 'mb-3'}`}
                    min={item.startingPrice} max={item.startingPrice + 500}
                    step={10}
                    value={bidValue}
                    onChange={handleBidChange}
                />

                <button className={`${isCreator ? 'hidden' : 'bg-sky-700 rounded-xl text-white py-1 lg:py-3 text-sm md:text-base h-50 mb-5 w-full pl-3 text-left'}`} onClick={handlePlaceBid}>
                    Place bid
                </button>
                <button className={`${isCreator ? 'hidden' : 'bg-sky-700 rounded-xl text-white py-1 lg:py-3 text-sm md:text-base h-50 mb-5 w-full pl-3 text-left'}`}>
                    Save to favorites
                </button>
            </div>
        </div>
    )
}

export default ItemPage;