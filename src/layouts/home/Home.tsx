import { useState, useEffect } from 'react';
import Item from '../../models/Item';
import './Home.css'
import ItemService from '../../services/ItemService';
import Loader from '../../components/loader/Loader';
import "../../App.css"
import ItemBlock from '../../components/homePage/itemBlock';

let hasLoaded = false;

export default function ItemList() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
       ItemService.GetAllItems().then((response) => {
        setItems(response.data)
        hasLoaded = true;
        })
    }, []);

    return hasLoaded ? (
        <div className='container bg-transparent flex flex-col'>
            <h1 className='text-5xl mx-auto'>Browse our items!</h1>
            <ul className='pl-0 flex flex-wrap lg:grid grid-cols-3'>
                {items.map((item, index) => (
                    // <li className='sales-item' key={index}>
                    //     <p className='bold'>{item.title}</p>
                    //     <p>Category: {item.category}</p>
                    // </li>
                    <ItemBlock id={item.id} title={item.title} category={item.category} startingPrice={item.startingPrice} currentBid={item.currentBid} description={item.description}></ItemBlock>
                ))}
            </ul>
            
        </div>
    ) : (
        <div className='container flex justify-center bg-transparent h-100vh items-center'>
            <Loader></Loader>
        </div>
    );
}