import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LocalStorageService } from '../local-storage.service';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  urls: any = [];
  urlElement = {
    id: 0,
    creationDate: '',
    url: '',
    shortUrl: '',
    usageCount: '',
  };
  url: string = '';
  shortUrl: string = '';
  urlError: string = '';
  shortUrlError: string = '';
  environment = environment.hostUrl;
  showModal = false;

  constructor(public api: ApiService, public localStorageService: LocalStorageService, public router: Router) { }

  ngOnInit() {
    this.getUrls();
  }

  getUrls() {
    this.urls = [];
    this.api.getUrls().subscribe((data) => {
      this.urls = data.map((item) => {
        item.shortUrl = environment.hostUrl + '/' + item.shortUrl;
        item.creationDate = item.creationDate.substr(0, 10);
        return item;
      });
    });
  }
  getUrl(url: string) {
    this.api.getUrl(url).subscribe((data) => {
      this.urlElement = data;
      this.urlElement.shortUrl = environment.hostUrl + '/' + this.urlElement.shortUrl;
      this.urlElement.creationDate = this.urlElement.creationDate.substr(0, 10);
      this.showModal = true;
    });
  }
  createUrl() {
    this.shortUrlError = '';
    this.urlError = '';
    if (this.url) {
      if (this.shortUrl.indexOf(' ') === -1) {
        if (this.shortUrl.indexOf('/') === -1 && this.shortUrl.indexOf(' ') === -1) {
          this.api.createUrl(this.url, this.shortUrl, this.localStorageService.getValue('userKey')).subscribe((data) => {
            if (data.status === 'ok') {
              this.urlElement = data.url;
              this.urlElement.shortUrl = environment.hostUrl + '/' + this.urlElement.shortUrl;
              this.urlElement.creationDate = this.urlElement.creationDate.substr(0, 10);
              this.showModal = true;
            } else {
              this.shortUrlError = data.errors.shortUrl ? data.errors.shortUrl : '';
              this.urlError = data.errors.url ? data.errors.url : '';
            }
          });
        } else {
          this.shortUrlError = 'You cant use "/" " "';
        }
      } else {
        this.urlError = 'You cant use "/" " "';
      }
    } else {
      this.urlError = 'Empty field';
    }
  }

}
