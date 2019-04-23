class Mensagem {

    constructor(armadilha, texto = '') {
        this._texto = texto;
        this._armadilha = armadilha;
    }

    get texto() {
        return this._texto;
    }

    set texto(texto) {
        this._texto = texto;
        this._armadilha(this);
    }
}