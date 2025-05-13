import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'todo-navbar',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private lightMediaQuery = '(prefers-color-scheme: light)'
  iconWidth = 26;
  iconHeight = 26;
  iconAltText = 'change color theme';
  colorThemeIcon: boolean = window.matchMedia(this.lightMediaQuery).matches; // true = light, dark = false

  toggleLightMode(currentModeLight: boolean | undefined = undefined) {
    const bodyClasses = document.documentElement.classList;
    const light = 'docs-light-mode';
    const dark = 'docs-dark-mode';

    if (!(currentModeLight == null)) {
      // gets an argument at page creation for setting up class matching preferred scheme
      currentModeLight ? bodyClasses.toggle(light) : bodyClasses.toggle(dark);
      return;
    }

    bodyClasses.toggle(light);
    bodyClasses.toggle(dark);

    this.colorThemeIcon = !this.colorThemeIcon;
  }

  ngOnInit(): void {
    let lightSchemeQuery = window.matchMedia(this.lightMediaQuery);
    lightSchemeQuery.addEventListener('change', () => this.toggleLightMode());

    this.toggleLightMode(lightSchemeQuery.matches);
  }

  ngOnDestroy(): void {
    window.removeEventListener('change', () => this.toggleLightMode());
  }
}
