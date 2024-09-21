import { ConfigurationStore } from "../lib/configuration-store";
import { IConfigurationSource } from "../lib/configuration-source";

export class TestConfigurationSource implements IConfigurationSource {
    private _loaded: boolean = false;

    constructor(private readonly key: string, private readonly value: string) {
    }

    get loaded(): boolean {
        return this._loaded;
    }

    loadAsync(): Promise<ConfigurationStore> {
        this._loaded = true;
        const result = new ConfigurationStore();
        result[this.key] = this.value;
        return Promise.resolve(result);
    }
}
