export type DataContextProps = {
    getData?: (url: string) => any;
    postData?: (url: string, body: any) => any;
    putData?: (url: string, body: any) => void;
    deleteData?: (url: string) => void;
}
export type PostType = {
    header?: string;
    body?: string;
    authorName?: string
    postedDate?: number;
}
export type UserType = {
    username: string;
    email: string;
    profilePictureLink: string;
}