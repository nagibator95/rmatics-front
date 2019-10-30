import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MessageResolverService {
    public isNavigated: boolean;

    constructor() {}
}
