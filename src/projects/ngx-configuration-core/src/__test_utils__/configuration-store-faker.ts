import { faker } from '@faker-js/faker';
import { ConfigurationStore } from '../lib/configuration-store';

export class ConfigurationStoreFaker {
    public static random() {
        const result = new ConfigurationStore();
        result[faker.string.sample()] = faker.string.sample();

        return result;
    }

    public static with(key: string, value: string) {
        const result = new ConfigurationStore();
        result[key] = value;

        return result;
    }
}
