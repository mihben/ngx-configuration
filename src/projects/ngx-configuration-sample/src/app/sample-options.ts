import { baseAddress } from '../../../ngx-configuration-options/src/lib/decorators/format-decorator';
import { required } from '../../../ngx-configuration-options/src/lib/decorators/required-decorator';

export class SampleOptions {
    @required()
    @baseAddress()
    public BaseAddress!: string;

    @required()
    public Path!: string;
}
