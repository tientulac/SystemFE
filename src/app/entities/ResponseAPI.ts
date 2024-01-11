export class ResponseAPI<T> {
    data!: T;
    code!: string | null;
    message!: string | null;
    messageEX!: string | null;
}

export class PaginatedList<T> {
    items?: T[] | null;
    totalCount?: number | null;
    pageIndex?: number | null;
    pageSize?: number | null
}