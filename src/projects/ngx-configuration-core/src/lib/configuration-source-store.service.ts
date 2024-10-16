import { inject, Injectable } from '@angular/core';
import { IConfigurationSource } from './configuration-source';
import { JsonConfigurationSourceOptions, JsonConfigurationSourceService } from './sources/json-configuration-source.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ConfigurationSourceStoreService {
    private _sources: IConfigurationSource[] = [];
    public get sources(): IConfigurationSource[] {
        return this._sources;
    }

    register(source: IConfigurationSource): ConfigurationSourceStoreService {
        this._sources.push(source);

        return this;
    }

    registerJson(path: string, optional = false): ConfigurationSourceStoreService {
        const options = new JsonConfigurationSourceOptions();
        options.path = path;
        options.optional = optional;

        this.register(new JsonConfigurationSourceService(inject(HttpClient), options));

        return this;
    }

    clear(): void {
        this._sources = [];
    }
}
