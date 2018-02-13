import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses$;
  author$;
  db: AngularFireDatabase;
  constructor(db: AngularFireDatabase) {
    this.db = db;
    this.courses$ = db.list('/courses').valueChanges();
    this.author$ = db.object('/authors/1').valueChanges();
  }

  add(course: HTMLInputElement) {
    this.db.list('/courses').push(course.value);
    course.value = '';
  }

}
