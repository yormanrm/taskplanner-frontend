import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { TaskLocalService } from '../../../data/task-datasource/service/task-local.service';
import { SvgWrapperComponent } from '../svg-wrapper/svg-wrapper.component';
import { FormsModule } from '@angular/forms';
import { getCurrentWeek, getLastWeek, getThisMonth, getLastMonth, getThisYear } from '../../utils/date-ranges.funciton';
import { formatDate } from '../../utils/format-dates.function';

@Component({
  selector: 'widget-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SvgWrapperComponent
  ],
  templateUrl: './widget-filters.component.html',
  styleUrl: './widget-filters.component.scss'
})
export class WidgetFiltersComponent {
  @ViewChild('dateSelect') dateSelect !: ElementRef<HTMLSelectElement>;
  public showCalendar: boolean = false;
  public startRange: string = "";
  public endRange: string = "";
  public today: Date = new Date();
  public f = {
    formatDate: (date: Date) => formatDate(date)
  }
  public taskLocalService = inject(TaskLocalService);

  onChangeDateFilter(event: Event) {
    let formatDates = { start: '', end: '' };
    let startDate: string = '';
    let endDate: string = '';
    const selectedOption = (event.target as HTMLSelectElement).value;
    switch (selectedOption) {
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
        this.showCalendar = true;
        break;

    }
    if (selectedOption != 'range') {
      this.taskLocalService.filterByDatesRange(startDate, endDate);
    }
  }

  clearRangeDates() {
    this.startRange = "";
    this.endRange = "";
  }

  setRangeDates() {
    this.taskLocalService.filterByDatesRange(this.startRange, this.endRange);
    this.closeModal();
  }

  closeModal() {
    this.showCalendar = false;
    this.dateSelect.nativeElement.value = "";
  }

}