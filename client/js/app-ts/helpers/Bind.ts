import { ProxyFactory } from '../services/ProxyFactory';

export class Bind {

    constructor(model: any, view: any, ...props: any) {
        let proxy = ProxyFactory.create(model, props, (model: any) => view.update(model));
        view.update(model);

        return proxy;
    }
}