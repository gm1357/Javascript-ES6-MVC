import { View } from './View';
import { DateHelper } from '../helpers/DateHelper';
import { currentInstance } from '../controllers/NegociacaoController';
import { Negociacao } from '../models/Negociacao';

export class NegociacoesView extends View {

    constructor(elemento: HTMLElement) {
        super(elemento);

        elemento.addEventListener('click', function(event: Event) {
            const target: any = event.target;

            if(target.nodeName == 'TH') {
                currentInstance().ordena(target.textContent.toLowerCase());
            }
        })
    }

    template(model: any): string {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${model.negociacoes.map((n: Negociacao) => `
                    <tr>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>
                `).join('')}
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td>${model.volumeTotal}</td>
            </tfoot>
        </table>
        `;
    }
}