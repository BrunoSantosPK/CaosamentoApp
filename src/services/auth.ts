import { LoginAPI } from "../interfaces/caosamento";

const BASE_URL = "http://192.168.0.192:3030";

type ResultLogin = {
    success: boolean,
    message?: string,
    data?: LoginAPI
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

        const result = await req.json();
        return { success: true, data: result };

    } catch(error: any) {
        return { success: false, message: error.message };
    }
}