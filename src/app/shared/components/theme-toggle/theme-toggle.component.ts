import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'shared-theme-toggle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputSwitchModule,
    ButtonModule
  ],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {

  @Input() toggleMode: boolean = true;
  
  constructor(public themeService: ThemeService) { }

  switchTheme(event: Event){
    const isChecked = (event.target as HTMLInputElement).checked;
    this.themeService.darkMode = isChecked;
    this.themeService.changeTheme();
  }

}
