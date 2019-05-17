export class Mensagem {

    constructor(private _texto: string = '') {}

    get texto(): string {
        return this._texto;
    }

    set texto(texto: string) {
        this._texto = texto;
    }
}