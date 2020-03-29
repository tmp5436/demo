import {Component, Input, OnInit} from '@angular/core';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
})
export class SocialLoginComponent implements OnInit {

  private user: SocialUser;
  public FACEBOOK_PROVIDER = FacebookLoginProvider.PROVIDER_ID;
  public GOOGLE_PROVIDER = GoogleLoginProvider.PROVIDER_ID;
  @Input() providerId: string;

  constructor(private authService: AuthService,
              private customAuthService: AuthenticationService) { }


  signIn(provider: string): void {
    this.authService.signIn(provider).then(socialusers => {
      console.log(socialusers);
      this.customAuthService.socialLogin(socialusers).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
    });
  }

  ngOnInit() {}

}
