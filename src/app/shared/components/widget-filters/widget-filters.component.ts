import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskLocalService } from '../../../data/task-datasource/service/task-local.service';
import { SvgWrapperComponent } from '../svg-wrapper/svg-wrapper.component';

@Component({
  selector: 'widget-filters',
  standalone: true,
  imports: [
    CommonModule,
    SvgWrapperComponent
  ],
  templateUrl: './widget-filters.component.html',
  styleUrl: './widget-filters.component.scss'
})
export class WidgetFiltersComponent {
  public taskLocalService = inject(TaskLocalService);
}