import { useState, useEffect } from 'react';
import Item from '../../models/Item';
import './Home.css'
import ItemService from '../../services/ItemService';

export default function ItemList() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
       ItemService.GetAllItems().then((response) => setItems(response.data))
    }, items);

    return (
        <div>
            <h1>Items</h1>
            <ul>
                {items.map((item, index) => (
                    <li className='sales-item' key={index}>
                        <p className='bold'>{item.name}</p>
                        <p>Category: {item.category}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}