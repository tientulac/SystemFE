export class ResponseAPI<T> {
    data!: T;
    code!: string | null;
    message!: string | null;
    messageEX!: string | null;
}