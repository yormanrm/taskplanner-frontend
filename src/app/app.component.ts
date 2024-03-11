import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ThemeToggleComponent],
  template: `
  <router-outlet></router-outlet>
  `
})

export class AppComponent {}