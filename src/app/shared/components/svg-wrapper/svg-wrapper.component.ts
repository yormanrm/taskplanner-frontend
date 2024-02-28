import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'svg-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent
  ],
  template: `
    <svg-icon src="{{svg}}" class="icon-style-{{key}}"></svg-icon>
  `
})
export class SvgWrapperComponent implements OnChanges, OnDestroy {

  @Input() svg !: string;
  @Input() key !: string;
  @Input() color!: string;
  @Input() width!: string;
  styleIcon !: HTMLStyleElement;

  ngOnChanges() {
    this.styleIcon = document.createElement('style');
    this.styleIcon.textContent = `
      .icon-style-${this.key} svg {
        width: ${this.width};
        height: 100%;
      }
      .icon-style-${this.key} path {
        stroke: ${this.color};
      }
    `;
    document.head.appendChild(this.styleIcon);
  }

  ngOnDestroy(): void {
    if (this.styleIcon && this.styleIcon.parentNode) {
      this.styleIcon.parentNode.removeChild(this.styleIcon);
    }
  }

}
