import AsyncStorage from "@react-native-async-storage/async-storage";

type Credentials = {
    uid: string,
    token: string,
    email: string
};

type ResultCredentials = {
    success: boolean,
    data?: Credentials,
    message?: string
};

export async function setCredentials(uid: string, token: string, email: string): Promise<ResultCredentials> {
    try {
        const data: Credentials = { uid, token, email };
        await AsyncStorage.setItem("credentials", JSON.stringify(data));
        return { success: true };
        
    } catch(error: any) {
        return { success: false, message: error.message };
    }
}

export async function getCredentials(): Promise<ResultCredentials> {
    try {
        const value = await AsyncStorage.getItem("credentials");
        if(value == null)
            throw new Error("Credenciais não encontradas.");

        const data: Credentials = JSON.parse(value);
        return { success: true, data };

    } catch(error: any) {
        return { success: false, message: error.message };
    }
}