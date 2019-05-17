export class DateHelper {

    constructor() {
        throw new Error('Está classe não pode ser instanciada');
    }

    static textoParaData(data: string): Date {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
            throw new Error('Deve estar no formato aaaa-mm-dd');
        }

        return new Date(...<[number, number, number]> data.split('-').map((item: any, index: number) => item - index % 2));
    }

    static dataParaTexto(data: Date): string {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }
}