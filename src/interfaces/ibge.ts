export interface IBGE_UF {
    id: number;
    sigla: string;
    nome: string;
    regiao: {
        id: number,
        sigla: string,
        nome: string
    }
}

export interface IBGE_CITY {
    id: number;
    nome: string;
}