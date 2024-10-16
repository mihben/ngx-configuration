import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Configuration } from '../../../ngx-configuration-core/src/public-api';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'Sample';

    constructor(public readonly configuration: Configuration) {
        console.log(`BaseAddress: ${configuration.get('BaseAddress')}`);
        console.log(`Path: ${configuration.get('Path')}`);
    }
}
