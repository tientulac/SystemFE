import { BaseEntity } from "./Base.Entity";
import { SearchEntity } from "./Search.Entity";

export class CategoryTypeEntity extends BaseEntity {
    code?: string | null;
    hashtag?: string | null;
    name?: boolean | null;
    image?: boolean | null;
    status?: number | null;
}

export class CategoryTypeEntitySearch extends SearchEntity {
}
