import { Injectable } from '@angular/core';
import { IConfigurationSource } from '../configuration-source';
import { ConfigurationStore } from '../configuration-store';

import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonConfigurationSourceService implements IConfigurationSource {

  constructor(private readonly client: HttpClient, private readonly options: JsonConfigurationSourceOptions) { }

  async loadAsync(): Promise<ConfigurationStore | null> {
    console.debug(`Attempting to load configuration from '${this.options.path}' path`)
    const result = new ConfigurationStore();

    try {
      const content = await lastValueFrom(this.client.get<any>(this.options.path));

      this.readValues(content, '', result);
      
      console.debug(`Configuration from '${this.options.path}' has been loaded`);
      return result;
    } catch (response: any) {
      if (response.status === HttpStatusCode.NotFound) {
        if (!this.options.optional) throw new Error(`Mandatory configuration on '${this.options.path}' path was not found`);

        console.debug(`Optional configuration on '${this.options.path}' path was not found`);
        return null;
      }
      throw response;
    }
  }

  private readValues(content: any, section: string, store: ConfigurationStore) {
    for (const key of Object.keys(content)) {
      const value = content[key];
      if (typeof value === 'object') {
        this.readValues(value, `${section}${key}:`, store);
      }
      else store[`${section}${key}`] = value;
    }
  }
}

export class JsonConfigurationSourceOptions {
  public path!: string;
  public optional: boolean = false;
}
