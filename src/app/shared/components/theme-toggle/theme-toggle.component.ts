import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'shared-theme-toggle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputSwitchModule,
    DropdownModule

  ],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) { }
}
