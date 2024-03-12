import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { StorageService } from '../core/services/storage.service';
import { Router, RouterModule } from '@angular/router';
import { SweetalertService } from '../core/services/sweetalert.service';
import { IJwtToken } from '../data/authentication-datasource/models/jwt-token.model';
import { PrimeNGModule } from '../shared/modules/primeng.module';
import { SvgTemplateComponent } from '../shared/components/svg-template/svg-template.component';
import { ThemeService } from '../core/services/theme.service';
import { ThemeToggleComponent } from '../shared/components/theme-toggle/theme-toggle.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { TaskLocalService } from '../data/task-datasource/service/task-local.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PrimeNGModule,
    WidgetsComponent,
    ThemeToggleComponent,
    SvgTemplateComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements AfterViewInit {
  mobileView: boolean = false;
  @ViewChild(WidgetsComponent) widgetsComponent!: WidgetsComponent;
  constructor(
    private storageService: StorageService,
    public themeService: ThemeService,
    private sweetAlertService: SweetalertService,
    public taskLocalService: TaskLocalService,
    private router: Router,
    private renderer: Renderer2, private el: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.applyWidthClass();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.applyWidthClass();
  }

  applyWidthClass() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1280) {
      this.mobileView = false;
    } else {
      this.mobileView = true;
    }
    this.closeSidebar();
  }

  closeSession() {
    const user: IJwtToken = this.storageService.getSessionItem('jwt');
    this.sweetAlertService.toastAlert('See you again ' + user.name, 'success', "bottom");
    this.storageService.removeSessionItem('jwt');
    this.router.navigate(['/authentication']);
  }

  closeSidebar() {
    const cardElement = this.el.nativeElement.querySelector('p-card');
    const mainElement = this.el.nativeElement.querySelector('main');
    if (this.mobileView) {
      this.renderer.addClass(cardElement, 'tw-hidden');
      this.renderer.addClass(mainElement, 'tw-ml-5');
      this.renderer.removeClass(mainElement, 'tw-ml-96');
    } else {
      this.renderer.removeClass(cardElement, 'tw-hidden');
      this.renderer.removeClass(mainElement, 'tw-ml-5');
      this.renderer.addClass(mainElement, 'tw-ml-96');
    }
    this.mobileView = !this.mobileView;
  }
}