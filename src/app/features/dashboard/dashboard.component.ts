import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { PrimeNGModule } from '../../shared/modules/primeng.module';
import { TaskLocalService } from '../../data/task-datasource/service/task-local.service';
import { ITask } from '../../data/task-datasource/models/task.model';
import { formatDate } from '../../shared/utils/format-dates.function';

@Component({
  selector: 'feature-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNGModule
  ],
  providers: [
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {

  public almostready: Signal<ITask[]> = computed(() => this.task_local_service.localTasks().filter(
    (task) => task.percentage > 80
  ));

  public justarrived: Signal<ITask[]> = computed(() => this.task_local_service.localTasks().filter(
    (task) => {
      const dateCreated_formated = this.datePipe.transform(task.dateCreated, 'yyyy-MM-dd');
      let today: Date | string = new Date();
      let yesterday: Date | string = new Date();
      let beforeyesterday: Date | string = new Date();

      yesterday.setDate(today.getDate() - 1);
      beforeyesterday.setDate(yesterday.getDate() - 1);

      today = formatDate(today);
      yesterday = formatDate(yesterday);
      beforeyesterday = formatDate(beforeyesterday);

      return dateCreated_formated === today || dateCreated_formated === yesterday || dateCreated_formated === beforeyesterday;
    }
  ));

  public existFilter: Signal<boolean> = computed(() => this.task_local_service.existFilter());

  public filteredTask: Signal<ITask[]> = computed(() => this.task_local_service.localTasks());

  constructor(private task_local_service: TaskLocalService, private datePipe: DatePipe){
    task_local_service.archived.set(false);
    task_local_service.getTasks();
  }

}