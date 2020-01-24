import { Injectable, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { getQueryParam } from '../helpers/url.helper';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themes: Array<Theme>  = [{
    'name': 'mr-indigo',
    'baseColor': '#604c8d',
    'isActive': true
  }];

  activatedTheme: Theme;

  constructor(@Inject(DOCUMENT) private document: any) {}

  // Invoked in AppComponent and apply 'activatedTheme' on startup
  applyMatTheme(render: Renderer2): void {
    this.activatedTheme = this.themes[0];
    this.setThemeFromQuery();
    this.changeTheme(render, this.activatedTheme);
  }

  changeTheme(render: Renderer2, theme: Theme): void {
    render.removeClass(this.document.body, this.activatedTheme.name);
    render.addClass(this.document.body, theme.name);
    this.flipActiveFlag(theme);
  }

  flipActiveFlag(theme: Theme): void {
    this.themes.forEach((availableTheme) => {
      availableTheme.isActive = false;
      if (availableTheme.name === theme.name) {
        availableTheme.isActive = true;
        this.activatedTheme = theme;
      }
    });
  }

  setThemeFromQuery(): void {
    const themeStr = getQueryParam('theme');
    try {
      this.activatedTheme = JSON.parse(themeStr);
      this.flipActiveFlag(this.activatedTheme);
    } catch (e) {}
  }
}
