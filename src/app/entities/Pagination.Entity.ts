export class PaginationEntity {
    pageSize!: number | null;
    pageIndex!: number | null;
    orderColumn!: string | null;
    orderDirection!: string | null;
    filters!: FilterModel[];
}

export class FilterModel {
    field!: string | null;
    value!: string | null;
}