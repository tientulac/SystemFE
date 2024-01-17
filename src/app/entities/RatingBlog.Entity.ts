import { BaseEntity } from "./Base.Entity";
import { BlogEntity } from "./Blog.Entity";
import { SearchEntity } from "./Search.Entity";
import { UserAccountEntity } from "./UserAccount.Entity";

export class RatingBlogEntity extends BaseEntity {
    blogId?: string | null;
    blog?: BlogEntity | null;
    userAccountId?: string | null;
    userAccount?: UserAccountEntity | null;
    comment?: string | null;
    isLike?: boolean | null;
    type?: number | null;
    fileBase64?: string | null;
    path?: string | null;
    isIncognito?: boolean | null;
    incognitoName?: string | null;
    reason?: string | null;
    status?: number | null;
}


export class RatingBlogEntitySearch extends SearchEntity {
    blogId?: string | null;
}