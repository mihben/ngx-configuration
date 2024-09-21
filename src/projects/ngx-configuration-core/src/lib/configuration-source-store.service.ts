import { Injectable } from '@angular/core';
import { IConfigurationSource } from './configuration-source';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationSourceStoreService {
  private _sources: IConfigurationSource[] = [];
  public get sources(): IConfigurationSource[] {
    return this._sources;
  }


  register(source: IConfigurationSource): void {
    this._sources.push(source);
  }

  clear(): void {
    this._sources = [];
  }
}
