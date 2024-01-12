class Item {
    id: number
    title: string
    category: string
    startingPrice: number
    currentBid: number
    description: string
    postedByUserId: number
    imageURLs: string

    constructor(id: number, title: string, category: string, startingPrice: number, currentBid: number, description: string, postedByUserId: number, imageURLs: string) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.startingPrice = startingPrice;
        this.currentBid = currentBid;
        this.description = description;
        this.postedByUserId = postedByUserId;
        this.imageURLs = imageURLs;
    }
}

export default Item;