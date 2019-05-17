import { Negociacao } from "./Negociacao";

export class ListaNegociacoes {
    
    _negociacoes: Negociacao[];

    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    get negociacoes(): Negociacao[] {
        return [].concat(this._negociacoes);
    }

    get volumeTotal(): number {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
     }

    esvazia(): void {
        this._negociacoes = [];
    }

    ordena(criterio: any): void {
        this._negociacoes.sort(criterio);        
    }

    inverteOrdem(): void {
        this._negociacoes.reverse();
    }
}