import Item from "../../models/ItemRequest"

function ItemBlock(item: Item) {
    return (
        <div className="relative w-[200px] h-[313px] lg:w-[285px] lg:h-[446px] justify-self-center border-2 rounded-xl m-3 transition-opacity ease-in-out duration-300 bg-white">
            <div className="absolute w-full h-fit top-[211px] lg:top-[301px] left-0">
                <div className="relative w-3/4 h-2/4 top-[5px] left-[8px] lg:top-[16px] lg:left-[16px]">
                    <div className="absolute w-[249px] h-[30px] top-[69px] left-0">
                        <div className="flex items-center gap-[16px] relative">
                            <div className="mt-[-1.00px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-color-gray-1 text-[20px] leading-[30px] relative w-fit tracking-[0] whitespace-nowrap">
                                €{item.currentBid}
                            </div>
                            <div className="[font-family:'Poppins-Regular',Helvetica] font-normal text-color-gray-4 text-[16px] leading-[24px] relative w-fit tracking-[0] whitespace-nowrap">
                                Started at
                                <span className="ml-1 line-through">
                                    €{item.startingPrice}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[61px] absolute top-0 left-0 overflow-hidden">
                        <div className="font-semibold text-color-gray-1 text-[24px] leading-[28.8px] whitespace-nowrap">
                            {item.title}
                        </div>
                        <div className="font-medium uppercase text-color-gray-3 text-[16px] leading-[24px] whitespace-nowrap">
                            {item.category}
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute w-full h-[211px] lg:h-[301px] top-0 left-0 bg-transparent">
                <div
                    className={`absolute w-full h-[211px] lg:h-[301px] top-0 left-0 bg-cover bg-[50%_50%]`}
                >
                    <div className={`relative h-[211px] lg:h-[301px] bg-cover bg-[50%_50%]`}>
                        <img src={item.imageURLs.split(',')[0]} className="absolute w-full h-[211px] lg:h-[301px] top-0 left-0 object-cover rounded-t-xl" alt="Image" />
                    </div>
                </div>
                <div className="relative w-full h-full top-0 left-0">
                    <div className="h-full">
                        <div className="w-full h-full flex justify-center opacity-0 group hover:opacity-100 transition-opacity">
                            <div className="absolute w-full h-full top-0 left-0 bg-gray-700 group-hover:opacity-70 rounded-xl"></div>
                            <a className="relative w-[204px] h-[48px] self-center group-hover:opacity-100 bg-white hover flex justify-center" href={`items/${item.id}`}>
                                <button className="justify-self-center text-center">
                                    View details
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemBlock