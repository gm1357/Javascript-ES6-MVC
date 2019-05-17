import { currentInstance } from './controllers/NegociacaoController';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../css/main.css';

let negociacaoController = currentInstance();

let form: HTMLFormElement = document.querySelector('.form');
form.onsubmit = negociacaoController.adiciona.bind(negociacaoController);

let button: HTMLButtonElement = document.querySelector('[type=button]');
button.onclick = negociacaoController.apaga.bind(negociacaoController);