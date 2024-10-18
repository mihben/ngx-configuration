import { valueOf, valueOfEnum } from '../lib/decorators/value-of-decorators';
import { required } from '../lib/decorators/required-decorators';

export enum TestEnum {
    POST = 'post',
    GET = 'get',
    PUT = 'put',
}

export const testArray = ['api/users', 'api/permissions'];

export class TestOptions {
    @required()
    public baseAddress!: string;

    @valueOf(testArray)
    public path?: string;

    @required('Method is required.')
    @valueOfEnum(TestEnum)
    public method?: TestEnum;
}

