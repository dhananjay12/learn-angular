import { Component } from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `<h1>{{title}}</h1>
    <h3>v{{currentApplicationVersion}}</h3>`
})
export class AppComponent {
  title = 'Demo App for versioning';
    currentApplicationVersion = environment.appVersion;
}
