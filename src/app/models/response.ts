export interface Response<T>{
    dados: T;
    menssagem: string;
    sucesso: boolean;
}