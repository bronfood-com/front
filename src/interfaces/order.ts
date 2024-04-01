export interface IOrderItem {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
}

export interface IOrder {
    total: number;
    orderCode: string;
    items: IOrderItem[];
}
