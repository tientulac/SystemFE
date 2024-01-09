import { BaseEntity } from "./Base.Entity";
import { CustomerEntity } from "./Customer.Entity";
import { RoleEntity } from "./Role.Entity";

export class UserAccountEntity extends BaseEntity {
    userName?: string | null;
    hashpassword?: string | null;
    roleId?: string | null;
    phone?: string | null;
    status?: number | null;
    role?: RoleEntity | null;
    customerId?: string | null;
    customer?: CustomerEntity | null;
}


export class UserAccountEntitySearch extends BaseEntity {
    userName?: string | null;
    hashpassword?: string | null;
    roleId?: string | null;
    phone?: string | null;
    status?: number | null;
    role?: RoleEntity | null;
    customerId?: string | null;
    customer?: CustomerEntity | null;
}


export class UserAccountLoginEntity extends BaseEntity {
    userName?: string | null;
    hashpassword?: string | null;
    roleId?: string | null;
    phone?: string | null;
    status?: number | null;
    role?: RoleEntity | null;
    customerId?: string | null;
    customer?: CustomerEntity | null;
    token?: string | null;
}