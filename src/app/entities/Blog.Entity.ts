import { BaseEntity } from "./Base.Entity";
import { CategoryEntity } from "./Category.Entity";
import { SearchEntity } from "./Search.Entity";
import { UserAccountEntity } from "./UserAccount.Entity";

export class BlogEntity extends BaseEntity {
    code?: string | null;
    name?: string | null;
    title?: string | null;
    userAccountId?: string | null;
    userAccount?: UserAccountEntity | null;
    content?: string | null;
    poster?: string | null;
    hashtag?: string | null;
    isIncognito?: boolean | null;
    incognitoName?: boolean | null;
    categoryId?: string | null;
    category?: CategoryEntity | null;
    status?: number | null;
    type?: number | null;
    isShown?: boolean;
    fileBase64?: string | null;
    path?: string | null;
    reason?: string;
    isNotify?: boolean;
}

export class BlogEntitySearch extends SearchEntity {
}
