import { currentInstance } from './controllers/NegociacaoController';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../css/main.css';

let negociacaoController = new currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);