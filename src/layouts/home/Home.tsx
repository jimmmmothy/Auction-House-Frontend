import { useState, useEffect } from 'react';
import Item from '../../models/ItemRequest';
import './Home.css'
import ItemService from '../../services/ItemService';
import Loader from '../../components/loader/Loader';
import "../../App.css"
import ItemBlock from '../../components/homePage/itemBlock';
import WatchesBackground from "../../assets/watches-background.png"
import { FaSearch } from 'react-icons/fa';

let hasLoaded = false;

export default function ItemList() {
    const [items, setItems] = useState<Item[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        ItemService.GetAllItems().then((response) => {
            setItems(response)
            hasLoaded = true;
        })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleSearch = (e: React.MouseEvent) => {
        e.preventDefault();
        ItemService.GetItemsByTitle(search).then((response) => {
            setItems(response);
        })
            .catch((error) => {
                console.log(error);
            })
    }

    return hasLoaded ? (
        <>
            <h1 className='absolute text-5xl mx-auto z-[1] top-[249px] w-full text-center text-white'>Browse</h1>
            <img className='absolute top-[74px] w-full h-[350px]' src={WatchesBackground} alt="Background" />
            <div className='container flex flex-col max-w-full absolute top-[424px] bg-transparent h-full w-full items-center'>
                <div className='flex w-1/2 mb-10 space-x-3'>
                    <input type='text' value={search} onChange={handleSearchChange} className='w-full rounded-full' placeholder='Search'></input>
                    <button className="m-auto rounded-full bg-gray-300 p-2" onClick={handleSearch}>
                        <FaSearch className="text-gray-600" />
                    </button>

                </div>
                <ul className='pl-0 flex flex-wrap lg:grid grid-cols-3'>
                    {items.map((item) => (
                        <ItemBlock id={item.id} title={item.title} category={item.category} startingPrice={item.startingPrice} currentBid={item.currentBid} description={item.description} postedByUserId={item.postedByUserId} key={item.id}></ItemBlock>
                    ))}
                </ul>

            </div>
        </>
    ) : (
        <>
            <h1 className='absolute text-5xl mx-auto z-[1] top-[249px] w-full text-center text-white'>Browse</h1>
            <img className='absolute top-[74px] w-full h-[350px]' src={WatchesBackground} alt="Background" />
            <div className='container max-w-full absolute top-[424px] justify-center bg-transparent h-full w-full items-top flex'>
                <Loader></Loader>
            </div>
        </>
    );
}