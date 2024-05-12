import { BaseModel } from "./base-model";

export class Brand extends BaseModel {
    code?: string;
    descrip?: string;
    name?: string;
    status?: number;
    image?: string;
}