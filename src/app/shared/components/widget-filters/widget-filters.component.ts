import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskLocalService } from '../../../data/task-datasource/service/task-local.service';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'widget-filters',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent
  ],
  templateUrl: './widget-filters.component.html',
  styleUrl: './widget-filters.component.scss'
})
export class WidgetFiltersComponent {
  public taskLocalService = inject(TaskLocalService);
}