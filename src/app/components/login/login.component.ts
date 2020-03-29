import { Component, OnInit } from '@angular/core';
import {User} from '../../models/interface';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = {id: 0, username: '', email: '', password: ''};

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {}

  login() {
    this.authService.login(this.user).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
