import { useState, useEffect } from 'react';
import Item from '../../models/Item';
import './Home.css'
import ItemService from '../../services/ItemService';
import Loader from '../../components/loader/Loader';
import "../../App.css"

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
        <div className='container'>
            <h1>Items</h1>
            <ul className='content-body no-indent'>
                {items.map((item, index) => (
                    <li className='sales-item' key={index}>
                        <p className='bold'>{item.title}</p>
                        <p>Category: {item.category}</p>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <div className='container flex justify-center bg-transparent h-100vh items-center'>
            <Loader></Loader>
        </div>
    );
}