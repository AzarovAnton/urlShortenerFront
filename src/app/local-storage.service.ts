import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(
    @Inject(LOCAL_STORAGE)
    private storage: StorageService
  ) { }
  public setValue(field: string, value: string): void {
    this.storage.set(field, value);
  }
  public getValue(field: string): any {
    return this.storage.get(field);
  }
}
