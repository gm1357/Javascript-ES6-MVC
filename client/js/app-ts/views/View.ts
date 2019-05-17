export class View {
    
    _elemento: HTMLElement;

    constructor(elemento: HTMLElement) {
        this._elemento = elemento;
    }

    template(model: any): string {
        throw new Error('O método template deve ser implementado');
    }

    update(model: any): void {
        this._elemento.innerHTML = this.template(model);
    }
}