import { BaseModel } from "./base-model";

export class Account extends BaseModel {
    user_name?: string;
    password?: string;
    status?: number;
    address?: string;
    avatar?: string;
    phone?: string;
    full_name?: string;
    email?: string;
    role_id?: string;
    token?: string;
    old_password?: string;
    new_password?: string;
    confirm_password?: string;
}