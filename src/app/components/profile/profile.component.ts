import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private paramsSubscribe: Subscription;
  private userId: number;
  public user: User;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.paramsSubscribe = this.activatedRoute.params.subscribe(params => {
      this.userId = params.id;
      this.loadUserProfile();
    });
  }

  loadUserProfile() {
    this.userService.getProfile(this.userId).subscribe(
      data => {
         this.user = data;
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscribe.unsubscribe();
  }

  edit() {
    this.userService.editProfile(this.user).subscribe(
      data => {
        console.log(data);
      }
    );
  }
}
