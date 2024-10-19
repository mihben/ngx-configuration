import { valueOf, valueOfEnum } from '../lib/decorators/value-of-decorator';
import { required } from '../lib/decorators/required-decorator';
import { range } from '../lib/decorators/range-decorator';
import { baseAddress } from '../lib/decorators/format-decorator';

export enum TestEnum {
    POST = 'post',
    GET = 'get',
    PUT = 'put',
}

export const testArray = ['api/users', 'api/permissions'];

export class TestOptions {
    @required()
    @baseAddress()
    public baseAddress!: string;

    @valueOf(testArray)
    public path?: string;

    @required('Method is required.')
    @valueOfEnum(TestEnum)
    public method?: TestEnum;

    @range({ min: 1, max: 65536 })
    public port!: number;
}

