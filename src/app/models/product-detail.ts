import { BaseModel } from "./base-model";

export class ProductDetail extends BaseModel {
    product_id?: string;
    code?: string;
    name?: string;
    color?: string;
    amount?: number;
    origin?: string;
    price?: number;
    gender?: number;
    size?: string;
    status?: number;
    poster?: string;
}