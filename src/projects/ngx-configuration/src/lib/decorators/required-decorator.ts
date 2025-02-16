import 'reflect-metadata';

const metadataKey = Symbol('required');

export interface RequiredParameter {
    message: string;
}

export function getRequired(target: any, propertyKey: string) {
    return Reflect.getMetadata(metadataKey, target, propertyKey) as RequiredParameter;
}

export function required(message: string | undefined = undefined) {
    return Reflect.metadata(metadataKey, { message: message ?? 'Required configuration is not defined.' });
}

