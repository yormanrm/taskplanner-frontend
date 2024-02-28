import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StorageService } from '../core/services/storage.service';
import { Router, RouterModule } from '@angular/router';
import { WidgetFiltersComponent } from '../shared/components/widget-filters/widget-filters.component';
import { SvgWrapperComponent } from '../shared/components/svg-wrapper/svg-wrapper.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    WidgetFiltersComponent,
    SvgWrapperComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  signOut() {
    alert("Goodbye");
    this.storageService.removeSessionItem('jwt');
    this.router.navigate(['/authentication']);
  }

}
