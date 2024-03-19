import { BaseEntity } from "./Base.Entity";
import { SearchEntity } from "./Search.Entity";
import { UserAccountEntity } from "./UserAccount.Entity";

export class NotifycationEntity extends BaseEntity {
    userAccountId?: string;
    userAccount?: UserAccountEntity;
    message?: string;
    isRead?: boolean;
    status?: number;
    type?: number;
}

export class NotifycationEntitySearch extends SearchEntity {
    message?: string;
}