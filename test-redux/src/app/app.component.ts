import { INCREMENT } from './actions';
import { IAppState } from './store';
import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Redux Demo';
  @select() counter;
  //to access messaging.newMessages
  @select(['messageing', 'newMessages']) newMessages;
  @select((s: IAppState) => s.messaging.newMessages) newMessagesCount;

  constructor(private ngRedux: NgRedux<IAppState>) {

  }

  increment() {
    //this.counter++;
    this.ngRedux.dispatch({ type: INCREMENT });
  }
}
