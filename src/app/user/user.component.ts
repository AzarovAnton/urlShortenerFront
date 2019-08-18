import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LocalStorageService } from '../local-storage.service';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  urls: any = [];

  environment = environment.hostUrl;

  constructor(public api: ApiService, public localStorageService: LocalStorageService, public router: Router) { }

  ngOnInit() {
    if (!this.localStorageService.getValue('userKey')) {
      this.router.navigate(['']);
    }
    this.getUrls();
  }

  getUrls() {
    this.urls = [];
    this.api.getNUrls(10).subscribe((data) => {
      this.urls = data.map((item) => {
        item.shortUrl = environment.hostUrl + '/' + item.shortUrl;
        item.creationDate = item.creationDate.substr(0, 10);
        return item;
      });
    });
  }

}
