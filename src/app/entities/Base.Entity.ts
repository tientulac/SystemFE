export class BaseEntity {
    id!: string | null;
    createdAt!: Date | null;
    createdBy!: string | null;
    updatedAt!: Date | null;
    updatedBy!: string | null;
    deletedAt!: Date | null;
    deletedBy!: string | null;
    isSoftDeleted!: boolean | null;
}