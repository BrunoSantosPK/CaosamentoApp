import { GetAnimals } from "../interfaces/api";

const BASE_URL = "http://192.168.0.192:3030";

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

export function getPhotoURL(photo: string) {
    return `${BASE_URL}/static/${photo}`;
}