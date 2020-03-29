import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  public user: User = {id: 0, username: '', email: '', password: ''};

    constructor(private userService: UserService) { }

    ngOnInit() {}

    registration() {
      this.userService.registration(this.user).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
