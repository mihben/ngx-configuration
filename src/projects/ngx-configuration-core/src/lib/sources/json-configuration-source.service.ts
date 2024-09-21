import { Injectable } from '@angular/core';
import { IConfigurationSource } from '../configuration-source';
import { ConfigurationStore } from '../configuration-store';

import * as fs from 'fs/promises';

@Injectable({
  providedIn: 'root'
})
export class JsonConfigurationSourceService implements IConfigurationSource {

  constructor(private readonly path: string) { }

  async loadAsync(): Promise<ConfigurationStore> {
    const content = await fs.readFile(this.path, 'utf-8');
    const json = JSON.parse(content);

    const result = new ConfigurationStore();

    for (const key of Object.keys(json)) {
      result[key] = json[key];
    }

    return result;
  }
}
