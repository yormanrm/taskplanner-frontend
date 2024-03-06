import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { FormsModule } from '@angular/forms';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ThemeToggleComponent],
  template: `
  <shared-theme-toggle></shared-theme-toggle>
  <router-outlet></router-outlet>
  `
})

export class AppComponent {}