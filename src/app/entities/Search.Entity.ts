import { PaginationEntity } from "./Pagination.Entity";

export class SearchEntity {
    id!: string | null;
    createdAt!: Date | null;
    createdBy!: string | null;
    updatedAt!: Date | null;
    updatedBy!: string | null;
    deletedAt!: Date | null;
    deletedBy!: string | null;
    isSoftDeleted!: boolean | null;
    searchString!: string | null;
    pagingAndSortingModel!: PaginationEntity
}

