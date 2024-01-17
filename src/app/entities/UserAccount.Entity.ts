import { BaseEntity } from "./Base.Entity";
import { CustomerEntity } from "./Customer.Entity";
import { RoleEntity } from "./Role.Entity";
import { SearchEntity } from "./Search.Entity";

export class UserAccountEntity extends BaseEntity {
    userName?: string | null;
    code?: string | null;
    hashpassword?: string | null;
    image?: string | null;
    email?: string | null;
    roleId?: string | null;
    phone?: string | null;
    status?: number | null;
    role?: RoleEntity | null;
    oldHashPassword?: string | null;
    newHashpassword?: string | null;
    confirmHashPassword?: string | null;
}

export class UserAccountEntitySearch extends SearchEntity {
}

export class UserAccountLoginEntity extends BaseEntity {
    userName?: string | null;
    code?: string | null;
    image?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: number | null;
    role?: RoleEntity | null;
    customer?: CustomerEntity | null;
    token?: string | null;
}