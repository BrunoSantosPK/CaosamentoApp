import { IBGE_UF, IBGE_CITY } from "../interfaces/ibge";

const BASE_URL = "https://servicodados.ibge.gov.br/api/v1/localidades";

type ResultUF = {
    success: boolean,
    message?: string,
    data?: Array<IBGE_UF>
};

type ResultCity = {
    success: boolean,
    message?: string,
    data?: Array<IBGE_CITY>
};

export async function getUFs(): Promise<ResultUF> {
    try {
        const url = `${BASE_URL}/estados`;
        const req = await fetch(url, { method: "GET" });

        const result: Array<IBGE_UF> = await req.json();
        return { success: true, data: result };

    } catch(error: any) {
        return { success: false, message: error.message };
    }
}

export async function getCityByUF(uf: number) {
    try {
        const url = `${BASE_URL}/estados/${uf}/municipios`;
        const req = await fetch(url, { method: "GET" });

        const result: Array<IBGE_CITY> = await req.json();
        return { success: true, data: result };

    } catch(error: any) {
        return { success: false, message: error.message };
    }
}