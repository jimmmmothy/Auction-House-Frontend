class Item {
    id: number
    title: string
    category: string
    startingPrice: number
    currentBid: number
    description: string

    constructor(id: number, title: string, category: string, startingPrice: number, currentBid: number, description: string) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.startingPrice = startingPrice;
        this.currentBid = currentBid;
        this.description = description;
    }
}

export default Item;