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

export interface BaseResponseAPI {
    statusCode: number,
    message: string
}

export interface Animal {
    _id: string;
    photo: string;
    uid: string;
    name: string;
    description: string
    breedId: string;
    breedName: string;
    city: string;
    country: string;
    us: string;
    email: string;
}

export interface GetAnimals {
    statusCode: number;
    message: string;
    data: {
        pets: Array<Animal>
    }
}

export interface GetUserData {
    statusCode: number;
    message: string;
    data: {
        user: {
            _id: string,
            name: string,
            email: string,
            uid: string,
            city: string,
            uf: string,
            whatsapp: string,
            shareWhatsapp: boolean,
            country: string
        }
    }
}