import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public api: ApiService, public localStorageService: LocalStorageService, public router: Router) { }

  userName = '';
  email = '';
  loading = true;

  ngOnInit(): void {
    const ne = 'userKey';
    this.router.events.subscribe((val: any) => {
      if (val['routerEvent']) {
        if (this.localStorageService.getValue(ne)) {
          this.getUserInfo();
        }
       }
    });
  }
  getUserInfo(): void {

    this.api.getUserInfo(this.localStorageService.getValue('userKey')).subscribe((data) => {
      if (data.status === 'ok') {
        this.localStorageService.setValue('userId', data.user.userId);
        this.userName = data.user.username;
        this.email = data.user.email;
        this.loading = false;
      } else {
        this.logout();
        this.loading = false;
      }
    });
  }
  logout() {
    this.localStorageService.setValue('userId', '');
    this.localStorageService.setValue('userKey', '');
    this.userName = '';
    this.email = '';
  }
}
