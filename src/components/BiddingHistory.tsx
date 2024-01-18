import { useEffect, useState } from "react";
import BidService from "../services/BidService";
import CheckAuth from "../services/CheckAuth";

function BiddingHistory() {
    const [bids, setBids] = useState<number[][]>([]);

    CheckAuth.CheckAuthenticated();

    useEffect(() => {
        BidService.GetBidsFromUser(CheckAuth.GetLoggedInUserId())
            .then(res => {
                console.log("Received Bids:", res);
                setBids(res);
            })
            .catch(error => {
                console.error("Error fetching bids:", error);
            });
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <h2 key={0} className="text-2xl font-bold mb-4">Bidding History</h2>
            <div key={1} className="flex overflow-auto gap-4">
                {bids?.map((bid, index) => {
                    console.log("BID:", bid)
                    return (
                        <div key={index} className="flex flex-col border border-black rounded-xl p-5 gap-2">
                            <a href={`/items/${bid[2]}`}>
                                <div key={0} className="flex gap-2">
                                    <p>{bid[0]}</p>
                                </div>
                                <div key={1} className="flex gap-2">
                                    <p className="font-bold">Bid:</p>
                                    <p>€{bid[1]}</p>
                                </div>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BiddingHistory;