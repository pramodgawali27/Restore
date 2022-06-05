    export interface IProduct {
        productId: number;
        productName: string;
        description: string;
        price: number;
        type?: string;
        brand: string;
        quantityInStock?: number;
        pictureUrl?: string;
    }