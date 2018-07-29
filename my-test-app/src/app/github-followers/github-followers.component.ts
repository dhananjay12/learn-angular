
import {combineLatest as observableCombineLatest,  Observable } from 'rxjs';

import {switchMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: any[];

  constructor(private service: GithubFollowersService, private route: ActivatedRoute) { }

  ngOnInit() {

    observableCombineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).pipe(
      switchMap(combine => {
        let id = combine[0].get('id');
        let page = combine[1].get('page');
        console.log(page);
        return this.service.getAll();
      }))
      .subscribe(followers => {
        this.followers = followers;
      })

  }
}
