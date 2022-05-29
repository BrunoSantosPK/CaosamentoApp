export interface LoginAPI {
    statusCode: number;
    message: string;
    data: {
        user: {
            uid: string,
            token: string
        }
    };
}