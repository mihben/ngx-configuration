import { Inject, Injectable } from '@angular/core';
import { IConfigurationSource } from './configuration-source';
import { ConfigurationSourceStoreService } from './configuration-source-store.service';
import { Configuration } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationLoaderService {

  constructor(private readonly store: ConfigurationSourceStoreService) { }

  async loadAsync(): Promise<Configuration> {
    for (const source of this.store.sources) {
      await source.loadAsync();
    }

    return new Configuration();
  }

}
