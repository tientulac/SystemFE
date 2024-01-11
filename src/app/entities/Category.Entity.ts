import { BaseEntity } from "./Base.Entity";
import { CategoryTypeEntity } from "./CategoryType.Entity";
import { SearchEntity } from "./Search.Entity";

export class CategoryEntity extends BaseEntity {
    code?: string | null;
    hashtag?: string | null;
    name?: boolean | null;
    image?: boolean | null;
    status?: number | null;
    parentCategoryId?: string | null;
    categoryTypeId?: string | null;
    categoryType?: CategoryTypeEntity | null;
}

export class CategoryEntitySearch extends SearchEntity {
}
