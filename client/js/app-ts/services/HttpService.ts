export class HttpService {

    _handleErrors(res: Response): Response {
        if (!res.ok) throw new Error(res.statusText);
        return res;
    }

    get(url: string): Promise<any> {
        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    post(url: string, dado: any): Promise<Response> {
        return fetch(url, {
            headers: {'Content-type': 'application/json'},
            method: 'post',
            body: JSON.stringify(dado)
        }).then(res => this._handleErrors(res));
    }
}