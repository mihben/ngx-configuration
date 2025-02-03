# ngx-configuration
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=mihben_ngx-configuration)](https://sonarcloud.io/summary/new_code?id=mihben_ngx-configuration)
[![Space Metric](https://mihben.testspace.com/spaces/297019/metrics/720812/badge?token=1aa21ff348b1169742761012a2a352f79015e6c8)](https://mihben.testspace.com/spaces/297019/current/Code%20Coverage?utm_campaign=metric&utm_medium=referral&utm_source=badge "Code Coverage (statements)")

The `ngx-configuration` packages provide ease-to-use solution for handling dynamic configuration in [Angular](https://angular.dev) webapplications. 
In an [Angular](https://angular.dev) application the configurations are built-in the application code, it means have to be defined build time. 
The `ngx-configuration-core` and `ngx-configuration-options` packages make possible to define the configurations runtime, use those as separated objects in the application and validate the defined values.

### Features
- Reading JSON configuration from external source
- Handling different environments
- Bind configuration sections to objects
- Validate the configuration

### Supported Versions

| Package                   | Version | Supported Angular Version |
| :------------------------ | :------ | :-----------------------: |
| ngx-configuration-core    | 1.x.x   |            >18            |
| ngx-configuration-options | 1.x.x   |            >18            |

### Workflow  
1. Loading the application
2. Reading configurations from registered sources
3. Binding configuration sections to options
4. Resolving registered options in a service (before resolving it the configurations are validated)
5. Using the configuration value via resolved options

## Getting Started
1. Install packages:
```bash
npm install ngx-configuration-core ngx-configuration-options
```

2. Create `BackendOptions.ts`:
```ts
export class BackendOptions {
    required()
    baseAddress: string;
    required()
    path: string;
}
```

3. Create `appsettings.json` as asset
```json
{
    "Backend": {
        "BaseAddress": "https://backend.service/",
        "Path": "api/"
    }
}
```

5. Registrate `appsettings.json` and `BackendOptions` in `app.config.ts`:
```ts
providers: [
    ...
    providerConfiguration(builder => builder.registerJson('appsettings.json')),
    providerOptions(BackendOptions, builder => builder.bind('Backend')),
    ...
]
```

6. Using `BackendOptions`
```ts
...
constructor(private readonly options: BackendOptions,
            private readonly http: HttpClient) {

}

get() {
    return this.httpClient.get<void>(`${options.baseAddress}${options.path}\get`)
        subscribe();
}
```

## Sample Code
Sample application can be found in the repository (`ngx-configuration-sample`).


## Documentations
- [Tutorials](https://github.com/mihben/ngx-configuration/wiki/Tutorial)
- API Documentation
- Release Notes

## Licence
**MIT**