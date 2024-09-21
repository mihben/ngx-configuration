import { Inject, Injectable } from '@angular/core';
import { IConfigurationSource } from './configuration-source';
import { ConfigurationSourceStoreService } from './configuration-source-store.service';
import { Configuration } from './configuration';
import { ConfigurationStore } from './configuration-store';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationLoaderService {

  constructor(private readonly store: ConfigurationSourceStoreService) { }

  async loadAsync(): Promise<Configuration> {
    const stores: ConfigurationStore[] = [];
    
    for (const source of this.store.sources) {
      stores.push(await source.loadAsync());
    }

    return new Configuration(stores);
  }

}
