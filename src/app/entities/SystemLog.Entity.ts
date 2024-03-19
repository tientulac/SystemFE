import { BaseEntity } from "./Base.Entity";
import { SearchEntity } from "./Search.Entity";
import { UserAccountEntity } from "./UserAccount.Entity";

export class SystemLogEntity extends BaseEntity {
    name?: string;
    jsonBody?: string;
    status?: number;
    type?: number;
}

export class SystemLogEntitySearch extends SearchEntity {
    name?: string;
    type!: number | null;
}