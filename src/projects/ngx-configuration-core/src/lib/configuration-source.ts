import { ConfigurationStore } from "./configuration-store";

export interface IConfigurationSource {
    loadAsync(): Promise<ConfigurationStore | null>;
}
