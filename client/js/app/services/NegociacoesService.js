class NegociacoesService {

    obterNegociacoesDaSemana(callback) {
        let xhr = new XMLHttpRequest;

        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log('Obtendo negociações do servidor.');

                    callback(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    
                } else {
                    console.log(xhr.responseText);
                    callback('Não foi possível obter as negociações');
                }
            }
        }

        xhr.send();
    }
}