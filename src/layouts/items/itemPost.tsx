import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import ItemService from "../../services/ItemService";
import Item from "../../models/ItemRequest";

interface Field {
    key: string;
    value: string;
}

function ItemPost() {
    const [item, setItem] = useState({
        id: 0,
        title: "",
        category: "",
        startingPrice: 0,
        currentBid: 0,
        description: {} as Object,
    });

    const [fields, setFields] = useState<Field[]>([{ key: "", value: "" }]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number | undefined, fieldName: 'key' | 'value' | undefined) => {
        const { id, value } = e.target;

        if (index !== undefined && fieldName !== undefined) {
            const updatedFields = [...fields];
            updatedFields[index][fieldName] = value;
            setFields(updatedFields);

            let description = Object.create({});
            for (const index in fields) {
                if (Object.prototype.hasOwnProperty.call(fields, index)) {
                    const element: Field = fields[index];

                    if (element.key) {
                        description[element.key] = element.value;
                    }
                }
            }

            setItem({
                ...item,
                description: description
            })
        } else {
            if (id === 'startingPrice') {
                const parsed = parseInt(value)
                setItem({
                    ...item,
                    [id]: parsed
                })
            } else {
                setItem({
                    ...item,
                    [id]: value
                })
            }
        }

        console.log(item);
    };

    const handleAddField = () => {
        setFields([...fields, { key: "", value: "" }]);
    };

    const handleRemoveField = (index: number) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let description = JSON.stringify(item.description);
        let sendItem = new Item(0, item.title, item.category, item.startingPrice, item.currentBid, description);

        let responseData = ItemService.PostItem(sendItem);
        console.log(responseData);
    };

    return (
        <div className="container  max-w-2xl mx-auto p-6 pt-[100px] bg-gray-100 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Post Item</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block mb-1">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={item.title}
                        onChange={(e) => handleChange(e, undefined, undefined)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block mb-1">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={item.category}
                        onChange={(e) => handleChange(e, undefined, undefined)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label htmlFor="startingPrice" className="block mb-1">Starting Price</label>
                    <input
                        type="number"
                        id="startingPrice"
                        name="startingPrice"
                        value={item.startingPrice}
                        onChange={(e) => handleChange(e, undefined, undefined)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div className="flex flex-col space-y-4">
                    <p className="font-bold">Description</p>
                    {fields.map((_, index) => (
                        <>
                            <div key={index} className="flex md:space-x-4">
                                <div className="flex flex-col md:flex-row md:w-5/6 sm:w-2/3 mr-auto">
                                    <input
                                        type="text"
                                        placeholder="Key"
                                        value={fields[index].key}
                                        onChange={(e) => handleChange(e, index, 'key')}
                                        className="md:w-1/3 border rounded p-2 my-2 md:my-0 md:mr-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Description value"
                                        value={fields[index].value}
                                        onChange={(e) => handleChange(e, index, 'value')}
                                        className="md:w-2/3 border rounded p-2 my-2 md:my-0 md:ml-2"
                                    />
                                </div>
                                <button className="bg-red-600 border-amber-800 border-2 h-[32px] w-[32px] self-center rounded-3xl text-white text-center text-xs" type="button" onClick={() => handleRemoveField(index)}>
                                    -
                                </button>
                            </div>
                        </>
                    ))}
                    <button type="button" onClick={handleAddField} className="self-end rounded-full bg-transparent text-white py-2 px-4">
                        <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                    </button>
                </div>
                <button type="submit" className="bg-cyan-500 transition-colors hover:bg-blue-600 text-white py-2 px-4 rounded">Submit</button>
            </form>
        </div>
    );
}

export default ItemPost;