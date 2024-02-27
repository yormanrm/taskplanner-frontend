import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-icon',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
<img>
  `
})
export class SvgIconComponent {
  @Input() iconPath!: string;
  @Input() color!: string;
  @Input() size!: string;
}