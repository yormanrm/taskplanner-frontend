import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public darkMode: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document, private storageService: StorageService) {
    let theme = storageService.getLocalItem("theme");
    if(theme) {
      this.darkMode = theme === 'dark' ? true : false;
      this.changeTheme();
    }
  }

  changeTheme(){
    let theme = this.darkMode ? 'dark' : 'light';
    this.storageService.setLocalItem("theme", theme);
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    themeLink.href = 'lara-' + theme + '-indigo.css'
  }

}
