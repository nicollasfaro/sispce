import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme: boolean = false;

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    this.applyTheme();
  }

  isDarkTheme() {
    return this.darkTheme;
  }

  private applyTheme() {
    if (this.darkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
