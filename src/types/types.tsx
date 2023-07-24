export type DataContextProps = {
    getData?: (url: string) => void;
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