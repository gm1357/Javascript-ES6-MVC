import { Negociacao } from '../models/Negociacao';

export class NegociacaoDao {

    _connection: any;
    _store: string;

    constructor(connection: any) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao: Negociacao): Promise<any> {
        return new Promise((resolve, reject) => {

            let request = this._connection
                            .transaction([this._store], 'readwrite')
                            .objectStore(this._store)
                            .add(negociacao);

            request.onsuccess = (e: Event) => {
                resolve();
            };

            request.onerror = (e: Event) => {
                let target: any = e.target;
                console.log(target.error);
                reject('Não foi possível adicionar a negociação');
            };
        });
    }

    listaTodos(): Promise<Negociacao[]> {
        return new Promise((resolve, reject) => {

            let cursor = this._connection
                            .transaction([this._store], 'readwrite')
                            .objectStore(this._store)
                            .openCursor();

            let negociacoes: Negociacao[] = [];

            cursor.onsuccess = (e: Event) => {
                let target: any = e.target;
                let atual = target.result;

                if(atual) {
                    let dado = atual.value;
                    
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                    atual.continue();
                } else { 
                    resolve(negociacoes);
                }
            };

            cursor.onerror = (e: Event) => {
                let target: any = e.target;
                console.log(target.error);
                reject('Não foi possível listar as negociações');
            };
        });
    }

    apagaTodos(): Promise<string> {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();
   
            request.onsuccess = (e: Event) => resolve('Negociações apagadas com sucesso');
   
            request.onerror = (e: Event) => {
                let target: any = e.target;
                console.log(target.error);
                reject('Não foi possível apagar as negociações');
            };
        });
    }
}