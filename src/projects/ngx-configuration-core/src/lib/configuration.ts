import { Injectable } from '@angular/core';
import { ConfigurationStore } from './configuration-store';

@Injectable({ providedIn: 'root' })
export class Configuration {
    private readonly _stores: ConfigurationStore[] = [];

    public add(store: ConfigurationStore) {
        this._stores.push(store);
    }

    public get(key: string): string | undefined {
        for (const configuration of this._stores.toReversed()) {
            if (Object.keys(configuration).some(k => k == key)) return configuration[key];
        }

        return undefined;
    }
}
