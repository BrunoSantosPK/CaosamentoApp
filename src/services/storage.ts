import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "./user";

type Credentials = {
    uid: string,
    token: string,
    email: string,
    pass: string,
    lastLogin: Date
};

type ResultCredentials = {
    success: boolean,
    data?: Credentials,
    message?: string
};

export async function setCredentials(uid: string, token: string, email: string, pass: string): Promise<ResultCredentials> {
    try {
        const data: Credentials = { uid, token, email, pass, lastLogin: new Date() };
        await AsyncStorage.setItem("credentials", JSON.stringify(data));
        return { success: true };
        
    } catch(error: any) {
        return { success: false, message: error.message };
    }
}

export async function getCredentials(): Promise<ResultCredentials> {
    try {
        // Recupera informações de cadastro
        const value = await AsyncStorage.getItem("credentials");
        if(value == null)
            throw new Error("Credenciais não encontradas.");

        // Verifica necessidade de novo login
        const data: Credentials = JSON.parse(value);
        const lastLogin = new Date(data.lastLogin);
        const limit = 50 * 60 * 1000;
        
        if(Date.now() - lastLogin.getTime() > limit) {
            const result = await login(data.email, data.pass);
            if(!result.success)
                throw new Error(result.message);

            const newToken = result.data?.data.user.token as string;
            data.token = newToken;
            setCredentials(data.uid, newToken, data.email, data.pass);
        }

        return { success: true, data };

    } catch(error: any) {
        return { success: false, message: error.message };
    }
}