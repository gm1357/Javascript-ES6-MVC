requirejs(["./controllers/NegociacaoController"], function(modulo) {
    let negociacaoController = modulo.currentInstance();
    
    document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
    document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
});
