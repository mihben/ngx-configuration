import { Injectable } from '@angular/core';
import { ConfigurationSourceStoreService } from './configuration-source-store.service';
import { Configuration } from './configuration';
import { ConfigurationStore } from './configuration-store';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationLoaderService {

  constructor(private readonly store: ConfigurationSourceStoreService, private readonly configuration: Configuration) { }

  async loadAsync(): Promise<void> {
    const stores: ConfigurationStore[] = [];

    for (const source of this.store.sources) {
      const configuration = await source.loadAsync();
      if (configuration) stores.push(configuration);
    }

    this.configuration.initialize(stores);
  }

}
