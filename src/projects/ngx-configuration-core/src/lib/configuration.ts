import { ConfigurationStore } from "./configuration-store";

export class Configuration {
    private _stores: ConfigurationStore[] = [];

    public initialize(stores: ConfigurationStore[]) {
        this._stores = stores;
    }

    public get(key: string): string | undefined {
        for (const configuration of this._stores.reverse()) {
            if (configuration[key]) return configuration[key];
        }

        return undefined;
    }
}