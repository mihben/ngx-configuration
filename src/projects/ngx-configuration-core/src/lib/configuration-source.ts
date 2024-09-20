export interface IConfigurationSource {
    load(): Promise<void>;
}
