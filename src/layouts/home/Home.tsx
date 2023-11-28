import { useState, useEffect } from 'react';
import Item from '../../models/ItemRequest';
import './Home.css'
import ItemService from '../../services/ItemService';
import Loader from '../../components/loader/Loader';
import "../../App.css"
import ItemBlock from '../../components/homePage/itemBlock';
import WatchesBackground from "../../assets/watches-background.png"

let hasLoaded = false;

export default function ItemList() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        ItemService.GetAllItems().then((response) => {
            setItems(response.data)
            hasLoaded = true;
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return hasLoaded ? (
        <>
            <h1 className='absolute text-5xl mx-auto z-[1] top-[249px] w-full text-center text-white'>Browse</h1>
            <img className='absolute top-[74px] w-full h-[350px]' src={WatchesBackground} alt="Background" />
            <div className='container max-w-full absolute top-[424px] justify-center bg-transparent h-full w-full items-center'>
                <ul className='pl-0 flex flex-wrap lg:grid grid-cols-3'>
                    {items.map((item, index) => (
                        <ItemBlock id={item.id} title={item.title} category={item.category} startingPrice={item.startingPrice} currentBid={item.currentBid} description={item.description} key={item.id}></ItemBlock>
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