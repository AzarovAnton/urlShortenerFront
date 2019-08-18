import { Component, OnInit } from '@angular/core';
import  { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  col = true;

  registerUser = {
    email: '',
    password: '',
    password2: '',
    userName: '',
  };
  registerUserErrors = {
    email: '',
    password: '',
    password2: '',
    userName: '',
  };
  loginUser = {
    email: '',
    password: '',
  };
  loginUserErrors = {
    email: '',
    password: '',
  };

  constructor(public api: ApiService, public localStorageService: LocalStorageService, public router: Router) { }

  ngOnInit() {
    if (this.localStorageService.getValue('userKey')) {
      this.router.navigate(['']);
    }
  }

  public changeCol(val: boolean) {
    this.col = val;
  }

  public login() {

    this.loginUserErrors = {
      email: '',
      password: '',
    };
    let errors = false;
    if (!this.loginUser.password) {
      errors = true;
      this.loginUserErrors.password = 'Empty password';
    }
    if (!this.loginUser.email) {
      this.loginUserErrors.email = 'Empty email';
      errors = true;
    }
    if (!errors) {
      this.api.loginUser(this.loginUser).subscribe((data) => {
        if (data.status === 'ok') {
          this.localStorageService.setValue('userKey', data.userKey);
          this.router.navigate(['']);
        } else {
          this.loginUserErrors = data.errors;
        }
      });
    }
  }
  public register() {
    this.registerUserErrors = {
      email: '',
      password: '',
      password2: '',
      userName: '',
    };
    let errors = false;
    if (!this.registerUser.password) {
      errors = true;
      this.registerUserErrors.password = 'Empty password';
    }
    if (!this.registerUser.password2) {
      errors = true;
      this.registerUserErrors.password = 'Empty password';
    }
    if (this.registerUser.password !== this.registerUser.password2) {
      this.registerUserErrors.password2 = 'Passwords doesn\'t match';
      errors = true;
    }
    if (!this.registerUser.email) {
      this.registerUserErrors.email = 'Empty email';
      errors = true;
    }
    if (!this.registerUser.userName) {
      this.registerUserErrors.userName = 'Empty name';
      errors = true;
    }
    if (!errors) {
      this.api.registerUser(this.registerUser).subscribe((data) => {
        if (data.status === 'ok') {
          this.localStorageService.setValue('userKey', data.userKey);
          this.router.navigate(['']);
        } else {
          this.registerUserErrors = data.errors;
        }
      });
    }
  }
}
