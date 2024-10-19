import 'reflect-metadata';

const metadataKey = Symbol('valueOf');

export function getValueOf(target: any, propertyKey: string): any[] {
    return Reflect.getMetadata(metadataKey, target, propertyKey) as any[];
}

export function valueOf<TValue>(values: TValue[]) {
    return Reflect.metadata(metadataKey, values);
}

export function valueOfEnum<TEnum extends Record<string | number, string | number>>(type: TEnum) {
    return valueOf(Object.values(type));
}

