/*
 * Public API Surface of ngx-configuration-core
 */

export { Configuration } from './lib/configuration';
export { ConfigurationStore } from './lib/configuration-store';

export { ConfigurationLoaderService } from './lib/configuration-loader.service';
export { ConfigurationSourceStoreService } from './lib/configuration-source-store.service';

export { JsonConfigurationSourceService } from './lib/sources/json-configuration-source.service';
export { JsonConfigurationSourceOptions } from './lib/sources/json-configuration-source-options';

export { provideConfiguration } from './provideConfiguration';
