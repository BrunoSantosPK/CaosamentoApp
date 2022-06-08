import { GetAnimals, GetBreeds, SearchAnimals, NewBreed, NewAnimal } from "../interfaces/api";

//const BASE_URL = "http://192.168.0.192:3030";
const BASE_URL = "http://192.168.0.134:3030";

export type DataSearch = {
    breed: string,
    uf?: string,
    city?: string,
    page: number,
    uid: string
};

export type DataNewAnimal = {
    uid: string,
    name: string,
    description: string,
    breed: string,
    photoURI: string
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

export async function newBreed(name: string, uid: string, token: string) {
    try {
        const url = `${BASE_URL}/breed`;
        const req = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                uid, token
            },
            body: JSON.stringify({ name, animal: "dog" })
        });

        const result: NewBreed = await req.json();
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

export async function newAnimal(data: DataNewAnimal, uid: string, token: string) {
    try {
        // Compõe o form data
        const form = new FormData();
        const fileParts = data.photoURI.split(".");
        const fileExtension = fileParts[fileParts.length - 1];

        form.append("uid", data.uid);
        form.append("name", data.name);
        form.append("breed", data.breed);
        form.append("description", data.description);
        form.append("photo", {
            name: `upload-image-${Date.now()}.${fileExtension}`,
            type: `image/${fileExtension}`,
            uri: data.photoURI
        } as any);

        // Envia requisição
        const url = `${BASE_URL}/animal`;
        const req = await fetch(url, {
            method: "POST",
            headers: { uid, token },
            body: form
        });

        const result: NewAnimal = await req.json();
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