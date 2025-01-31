import { baseAddress } from '../../../ngx-configuration-options/src/lib/decorators/format-decorator';
import { required } from '../../../ngx-configuration-options/src/lib/decorators/required-decorator';

export class BackendOptions {
    @required()
    @baseAddress()
    public baseAddress!: string;

    @required()
    public path!: string;
}
