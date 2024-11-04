import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SampleOptions } from './sample-options';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'Sample';

    constructor(public readonly options: SampleOptions) {}
}
