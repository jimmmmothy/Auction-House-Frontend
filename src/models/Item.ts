class Item {
    title: string
    category: string
    startingPrice: number
    currentBid: number
    description: string

    constructor(title: string, category: string, startingPrice: number, currentBid: number, description: string) {
        this.title = title;
        this.category = category;
        this.startingPrice = startingPrice;
        this.currentBid = currentBid;
        this.description = description;
    }
}

export default Item;