import { BaseEntity } from "./Base.Entity";
import { SearchEntity } from "./Search.Entity";

export class CustomerEntity extends BaseEntity {
    code?: string | null;
    fullName?: string | null;
    birth?: Date | null;
    address?: string | null;
    gender?: number | null;
}

export class CustomerEntitySearch extends SearchEntity {
    code?: string | null;
    fullName?: string | null;
    birth?: Date | null;
    address?: string | null;
    gender?: number | null;
}