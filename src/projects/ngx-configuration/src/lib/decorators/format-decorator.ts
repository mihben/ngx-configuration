import 'reflect-metadata';

const metadataKey = Symbol('format');

export function getFormat(target: any, propertyKey: string): string {
    return Reflect.getMetadata(metadataKey, target, propertyKey) as string;
}

export function format(format: string) {
    return Reflect.metadata(metadataKey, format);
}

export function baseAddress() {
    return format('^(ftp|http|https)://[^ "]+/$');
}
