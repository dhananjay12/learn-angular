import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: any[];

  constructor(private service: GithubFollowersService, private route: ActivatedRoute) { }

  ngOnInit() {

    Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
      .switchMap(combine => {
        let id = combine[0].get('id');
        let page = combine[1].get('page');
        console.log(page);
        return this.service.getAll();
      })
      .subscribe(followers => {
        this.followers = followers;
      })

  }
}
