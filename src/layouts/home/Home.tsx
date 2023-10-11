import { useState, useEffect } from 'react';
import Item from '../../models/Item';
import './Home.css'
import ItemService from '../../services/ItemService';
import Loader from '../../components/loader/Loader';

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
        <div>
            <h1>Items</h1>
            <ul className='content-body no-indent'>
                {items.map((item, index) => (
                    <li className='sales-item' key={index}>
                        <p className='bold'>{item.name}</p>
                        <p>Category: {item.category}</p>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <div>
            <h1>Items</h1>
            <Loader></Loader>
        </div>
    );
}