export interface IUser {
    id: number | null;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    dateCreated: string | null;
    dateUpdated: string | null;
}