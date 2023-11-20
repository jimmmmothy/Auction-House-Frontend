import { useEffect, useState } from "react";
import Item from "../../models/ItemRequest";
import ItemService from "../../services/ItemService";
import { useParams } from "react-router-dom";
import "../../App.css"
import Loader from "../../components/loader/Loader";
import { Button } from "@material-tailwind/react";

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
        description: ''
    });
    const params = useParams<RouterParams>();
    const [description, setDescription] = useState<any>('')

    useEffect(() => {
        const id = params.id!;
        let parsedId: number = parseInt(id, 10);

        ItemService.GetItem(parsedId).then(response => {
            setItem(response.data);
            let sliced: string = response.data.description.slice(1, item.description.length - 1);
            console.log("1" + sliced);

            let replaced = sliced.replace(new RegExp("\\\\", 'g'), "");
            setDescription(JSON.parse(replaced));
            console.log(description);
        }).then(() => { hasLoaded = true });
    }, []);


    return (
        <div className="container h-full bg-transparent flex">
            <div className="flex-grow flex flex-col">
                <div className="bg-orange-200 flex-grow mb-10 border-2 border-black border-opacity-20">image placeholder</div>
                <div className="bg-orange-200 flex-grow mt-10 border-2 border-black border-opacity-20">image placeholder</div>
            </div>
            <div className="flex flex-col flex-grow mx-10 ">
                <h1 className="text-2xl font-bold mb-5 uppercase">{item.title}</h1>
                <p className="mb-10">{item.category}</p>
                <table className="text-left bg-opacity-50 my-5">
                    <thead className="text-m uppercase bg-cyan-100">
                        <tr>
                            <th colSpan={2} className="px-6 py-3">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {hasLoaded ? Object.keys(description).map((key, index) => (
                            <tr className="text-s border-b-2 border-gray-100">
                                <th className="px-6 py-2 font-medium first-letter:uppercase">
                                    {key}
                                </th>
                                <td>
                                    {Array.isArray(description[key]) ? description[key].join(', ') : description[key]}
                                </td>
                            </tr>
                        )) : <Loader />}
                    </tbody>
                </table>
            </div>
            <div className="bg-cyan-200 w-80 h-96 flex flex-col rounded-xl bg-opacity-20 items-left px-10 border-black border-2 border-opacity-20">
                <h1 className="text-xl font-semibold my-5">Starting price: €{item.startingPrice}</h1>
                <h1 className="text-xl font-semibold flex-grow">Current bid: €{item.currentBid}</h1>

                <Button ripple={true} variant="gradient" size="md" className="text-black h-50 bg-white mb-5 w-full flex items-center">
                    <svg className="mr-4" fill="#426AB2" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#426AB2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4,13.5H6.111A11.218,11.218,0,0,1,6,12a11.218,11.218,0,0,1,.111-1.5H4a1,1,0,0,1,0-2H6.571A8.983,8.983,0,0,1,14.857,2a7.962,7.962,0,0,1,3.59.854,1,1,0,0,1-.894,1.79A5.98,5.98,0,0,0,14.857,4,6.857,6.857,0,0,0,8.7,8.5H14a1,1,0,0,1,0,2H8.125a9.062,9.062,0,0,0,0,3H13a1,1,0,0,1,0,2H8.7A6.857,6.857,0,0,0,14.857,20a5.98,5.98,0,0,0,2.7-.644,1,1,0,0,1,.894,1.79,7.962,7.962,0,0,1-3.59.854,8.983,8.983,0,0,1-8.286-6.5H4a1,1,0,0,1,0-2Z"></path></g>
                    </svg>
                    Place bid
                </Button>
                <Button ripple={true} variant="gradient" size="md" className="text-black h-50 bg-white mb-5 w-full flex items-center">
                    <svg className="mr-auto" width="20px" height="20px" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.051 45.6071L17.851 54.7401C17.2728 55.1729 16.5856 55.4363 15.8662 55.5008C15.1468 55.5652 14.4237 55.4282 13.7778 55.1049C13.1319 54.7817 12.5887 54.2851 12.209 53.6707C11.8293 53.0563 11.6281 52.3483 11.628 51.626V15.306C11.628 13.2423 12.4477 11.2631 13.9069 9.8037C15.3661 8.34432 17.3452 7.52431 19.409 7.52405H45.35C47.4137 7.52431 49.3929 8.34432 50.8521 9.8037C52.3112 11.2631 53.131 13.2423 53.131 15.306V51.625C53.1309 52.3473 52.9297 53.0553 52.55 53.6697C52.1703 54.2841 51.6271 54.7807 50.9812 55.1039C50.3353 55.4272 49.6122 55.5642 48.8928 55.4998C48.1734 55.4353 47.4862 55.1719 46.908 54.739L34.715 45.6071C34.0419 45.1031 33.2238 44.8308 32.383 44.8308C31.5422 44.8308 30.724 45.1031 30.051 45.6071V45.6071Z" stroke="#426AB2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Save to favorites
                </Button>
            </div>
        </div>
    )
}

export default ItemPage;