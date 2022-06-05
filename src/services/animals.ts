import { GetAnimals, GetBreeds, SearchAnimals } from "../interfaces/api";

const BASE_URL = "http://192.168.0.192:3030";

export type DataSearch = {
    breed: string,
    uf?: string,
    city?: string,
    page: number,
    uid: string
};

export async function getPETs(uid: string, token: string) {
    try {
        const url = `${BASE_URL}/animal/${uid}`;
        const req = await fetch(url, {
            method: "GET",
            headers: { uid, token }
        });

        const result: GetAnimals = await req.json();
        if(result.statusCode != 200)
            throw new Error(result.message);

        return { success: true, data: result };

    } catch(error: any) {
        return { success: false, message: error.message };
    }
}

export async function getBreeds(uid: string, token: string) {
    try {
        const url = `${BASE_URL}/breed`;
        const req = await fetch(url, {
            method: "GET",
            headers: { uid, token }
        });

        const result: GetBreeds = await req.json();
        if(result.statusCode != 200)
            throw new Error(result.message);

        return { success: true, data: result };

    } catch(error: any) {
        return { success: false, message: error.message };
    }
}

export async function searchAnimals(data: DataSearch, uid: string, token: string) {
    try {
        const url = new URL(`${BASE_URL}/animal`);
        const dt = data as any;
        for(let key in dt) {
            url.searchParams.append(key, dt[key]);
        }

        const req = await fetch(url, {
            method: "GET",
            headers: { uid, token }
        });

        const result: SearchAnimals = await req.json();
        if(result.statusCode != 200)
            throw new Error(result.message);

        return { success: true, data: result };

    } catch(error: any) {
        return { success: false, message: error.message };
    }
}

export function getPhotoURL(photo: string) {
    return `${BASE_URL}/static/${photo}`;
}