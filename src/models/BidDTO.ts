class BidDTO {
    itemId: number;
    userId: number;
    bidAmount: number;

    constructor(itemId: number, userId: number, bidAmount: number) {
        this.itemId = itemId;
        this.userId = userId;
        this.bidAmount = bidAmount;
    }
}

export default BidDTO;