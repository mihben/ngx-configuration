import { ConfigurationStore } from "./configuration-store";

export class Configuration {
    constructor(private readonly stores: ConfigurationStore[]) {

    }

    public get(key: string): string | undefined {
        for (const configuration of this.stores.reverse()) {
            if (configuration[key]) return configuration[key];
        }

        return undefined;
    }
}