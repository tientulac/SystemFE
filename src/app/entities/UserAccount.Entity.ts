import { BaseEntity } from "./Base.Entity";
import { CustomerEntity } from "./Customer.Entity";
import { RoleEntity } from "./Role.Entity";
import { SearchEntity } from "./Search.Entity";

export class UserAccountEntity extends BaseEntity {
    code?: string | null;
    userName?: string | null;
    hashpassword?: string | null;
    roleId?: string | null;
    phone?: string | null;
    image?: string | null;
    email?: string | null;
    status?: number | null;
    role?: RoleEntity | null;
    customerId?: string | null;
    customer?: CustomerEntity | null;
}

export class UserAccountEntitySearch extends SearchEntity {
}

export class UserAccountLoginEntity extends BaseEntity {
    code?: string | null;
    userName?: string | null;
    hashpassword?: string | null;
    roleId?: string | null;
    image?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: number | null;
    role?: RoleEntity | null;
    customerId?: string | null;
    customer?: CustomerEntity | null;
    token?: string | null;
}