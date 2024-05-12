import { BaseModel } from "./base-model";

export class Category extends BaseModel {
    parent_category_id?: string;
    code?: string;
    descrip?: string;
    name?: string;
    status?: number;
    image?: string;
}