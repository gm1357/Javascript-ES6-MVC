import { HttpService } from './HttpService';
import { ConnectionFactory } from './ConnectionFactory';
import { NegociacaoDao } from '../dao/NegociacaoDao';
import { Negociacao } from '../models/Negociacao';
import { SERVICE_URL } from '../constatnts';

export class NegociacoesService {
    _http: HttpService;

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana(): Promise<Negociacao[]> {

        return this._http.get(`${SERVICE_URL}/negociacoes/semana`)
            .then((negociacoes: Negociacao[]) => {
                console.log(negociacoes);
                return negociacoes.map((objeto: Negociacao) => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            }).catch((erro: Error) => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            });
    }
    
    obterNegociacoesDaSemanaAnterior(): Promise<Negociacao[]> {

         return this._http.get(`${SERVICE_URL}/negociacoes/anterior`)
            .then((negociacoes: Negociacao[]) => {
                console.log(negociacoes);
                return negociacoes.map((objeto: Negociacao) => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            }).catch((erro: Error) => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior');
            });
    }

    obterNegociacoesDaSemanaRetrasada(): Promise<Negociacao[]> {

        return this._http.get(`${SERVICE_URL}/negociacoes/retrasada`)
            .then((negociacoes: Negociacao[]) => {
                console.log(negociacoes);
                return negociacoes.map((objeto: Negociacao) => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            }).catch((erro: Error) => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada');
            });
    }

    obterNegociacoes(): Promise<Negociacao[]> {

        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then((periodos: Negociacao[][]) => {
            let negociacoes: Negociacao[] = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);
            return negociacoes;
        }).catch((erro: string) => {
            throw new Error(erro);
        });
    }

    cadastra(negociacao: Negociacao): Promise<string> {
        return ConnectionFactory
            .getConnection()
            .then((connection: any) => new NegociacaoDao(connection))
            .then((dao: NegociacaoDao) => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível adicionar a negociação');
            });
    }

    lista(): Promise<Negociacao[]>  {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível listar as negociações');
            });
    }

    apaga(): any {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações');
            });
    }

    importa(listaAtual: Negociacao[]): Promise<Negociacao[]> {
        return this.obterNegociacoes()
            .then(negociacoes => negociacoes.filter(
                negociacao => !listaAtual.some(
                    (negociacaoExistente: Negociacao) => negociacaoExistente.isEquals(negociacao)
                )
            ))
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível importar negociações');
            });
    }
}