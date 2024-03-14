import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Signal, computed } from '@angular/core';
import { TaskLocalService } from '../../data/task-datasource/service/task-local.service';
import { PrimeNGModule } from '../../shared/modules/primeng.module';
import { ITask } from '../../data/task-datasource/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNGModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnChanges {
  @Input('status') statusParam !: string;
  public tasks: Signal<ITask[]> = computed(() => this.task_local_service.localTasks());
  constructor(private task_local_service: TaskLocalService) {}

  ngOnChanges(): void {
    if(this.statusParam === 'ARCHIVED'){
      this.task_local_service.archived.set(true);
      this.task_local_service.getTasks();
    } else {
      this.task_local_service.archived.set(false);
      this.task_local_service.byStatusTrigger(this.statusParam);
    }
  }
}