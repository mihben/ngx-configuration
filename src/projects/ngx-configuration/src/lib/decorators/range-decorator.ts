import 'reflect-metadata';

const metadataKey = Symbol('range');

export interface RangeParameters {
    min?: number;
    max?: number;
}

export function getRange(target: any, propertyKey: string): RangeParameters {
    return Reflect.getMetadata(metadataKey, target, propertyKey) as RangeParameters;
}

export function range(parameters: RangeParameters) {
    return Reflect.metadata(metadataKey, parameters);
}
