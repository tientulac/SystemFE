import { BaseModel } from "./base-model";

export class Product extends BaseModel {
    code?: string;
    name?: string;
    brand_id?: string;
    category_id?: string;
}