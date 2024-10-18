import { faker } from '@faker-js/faker';
import { testArray, TestEnum, TestOptions } from './test-options';

export class OptionsFaker {
    public static random(): TestOptions {
        const result = new TestOptions();
        result.baseAddress = faker.string.sample();
        result.path = faker.helpers.arrayElement(testArray);
        result.method = faker.helpers.enumValue(TestEnum);
        result.port = faker.internet.port();

        return result;
    }

    public static setBaseAddress(value: string | undefined | null): TestOptions {
        const result = this.random();
        Reflect.set(result, 'baseAddress', value);

        return result;
    }

    public static setPath(value: string): TestOptions {
        const result = this.random();
        Reflect.set(result, 'path', value);

        return result;
    }

    public static setMethod(value: string | undefined | null): TestOptions {
        const result = this.random();
        Reflect.set(result, 'method', value);

        return result;
    }

    public static setPort(value: number): TestOptions {
        const result = this.random();
        Reflect.set(result, 'port', value);

        return result;
    }
}

