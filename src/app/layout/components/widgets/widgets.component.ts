import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { PrimeNGModule } from '../../../shared/modules/primeng.module';
import { SvgTemplateComponent } from '../../../shared/components/svg-template/svg-template.component';
import { ThemeService } from '../../../core/services/theme.service';
import { TaskLocalService } from '../../../data/task-datasource/service/task-local.service';
import { formatDate } from '../../../shared/utils/format-dates.function';
import { getCurrentWeek, getLastMonth, getLastWeek, getThisMonth, getThisYear } from '../../../shared/utils/date-ranges.funciton';

@Component({
  selector: 'layout-widgets',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNGModule,
    SvgTemplateComponent
  ],
  templateUrl: './widgets.component.html',
  styleUrl: './widgets.component.scss',
})
export class WidgetsComponent {
  dateOptions = [
    { name: 'Today', code: 'today' },
    { name: 'Yesterday', code: 'yesterday' },
    { name: 'This week', code: 'weekA' },
    { name: 'Last week', code: 'weekB' },
    { name: 'This month', code: 'monthA' },
    { name: 'Last month', code: 'monthB' },
    { name: 'This year', code: 'year' },
    { name: 'Custom range', code: 'range' },
  ];
  public today: Date = new Date();

  constructor(public themeService: ThemeService, public taskLocalService: TaskLocalService) { }

  @Output() openSB = new EventEmitter<boolean>();

  openSidebar() {
    this.openSB.emit();
  }

  onChangeDateFilter(event: any) {
    const selectedOption = event.value;
    if (selectedOption != null) {
      let formatDates = { start: '', end: '' };
      let startDate: string = '';
      let endDate: string = '';

      switch (selectedOption.code) {
        case "today":
          startDate = formatDate(this.today);
          endDate = formatDate(this.today);
          break;

        case "yesterday":
          const yesterday = new Date();
          yesterday.setDate(this.today.getDate() - 1);
          startDate = formatDate(yesterday);
          endDate = formatDate(yesterday);
          break;

        case "weekA":
          formatDates = getCurrentWeek(this.today);
          startDate = formatDates.start;
          endDate = formatDates.end;
          break;

        case "weekB":
          formatDates = getLastWeek(this.today);
          startDate = formatDates.start;
          endDate = formatDates.end;
          break;

        case "monthA":
          formatDates = getThisMonth(this.today);
          startDate = formatDates.start;
          endDate = formatDates.end;
          break;

        case "monthB":
          formatDates = getLastMonth(this.today);
          startDate = formatDates.start;
          endDate = formatDates.end;
          break;

        case "year":
          formatDates = getThisYear(this.today);
          startDate = formatDates.start;
          endDate = formatDates.end;
          break;

        case "range":
          break;
      }
      if (selectedOption != 'range') {
        this.taskLocalService.filterByDatesRange(startDate, endDate);
      }
    } else {
      this.taskLocalService.existFilter.set(false);
      this.taskLocalService.getTasks();
    }
  }

}
