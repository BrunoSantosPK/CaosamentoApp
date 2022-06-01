import { LoginAPI, BaseResponseAPI } from "../interfaces/api";

const BASE_URL = "http://192.168.0.192:3030";

export type ResultLogin = {
    success: boolean,
    message?: string,
    data?: LoginAPI
};

export type ResultReset = {
    success: boolean,
    message?: string,
    data?: BaseResponseAPI
};

export async function login(email: string, pass: string): Promise<ResultLogin> {
    try {
        const url = `${BASE_URL}/login`;
        const req = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, pass })
        });

        const result: LoginAPI = await req.json();
        if(result.statusCode != 200)
            throw new Error(result.message);

        return { success: true, data: result };

    } catch(error: any) {
        return { success: false, message: error.message };
    }
}

export async function reset(email: string): Promise<ResultReset> {
    try {
        const url = `${BASE_URL}/pass`;
        const req = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        });

        const result: BaseResponseAPI = await req.json();
        if(result.statusCode != 200)
            throw new Error(result.message);
            
        return { success: true, data: result };

    } catch(error: any) {
        return { success: false, message: error.message };
    }
}

export async function newUser(email: string, pass: string, repeatPass: string): Promise<ResultReset> {
    try {
        const url = `${BASE_URL}/user`;
        const req = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, pass, repeatPass })
        });

        const result: BaseResponseAPI = await req.json();
        if(result.statusCode != 200)
            throw new Error(result.message);
            
        return { success: true, data: result };

    } catch(error: any) {
        return { success: false, message: error.message };
    }
} 