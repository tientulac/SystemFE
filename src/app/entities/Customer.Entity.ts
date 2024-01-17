import { BaseEntity } from "./Base.Entity";
import { SearchEntity } from "./Search.Entity";
import { UserAccountEntity } from "./UserAccount.Entity";

export class CustomerEntity extends BaseEntity {
    code?: string | null;
    fullName?: string | null;
    birth?: Date | null;
    address?: string | null;
    gender?: number | null;
    userId?: string | null;
    userAccount?: UserAccountEntity | null;
}

export class CustomerEntitySearch extends SearchEntity {
    code?: string | null;
    fullName?: string | null;
    birth?: Date | null;
    address?: string | null;
    gender?: number | null;
    userId?: string | null;
}