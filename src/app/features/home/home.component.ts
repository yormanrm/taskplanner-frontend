import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { TaskService } from '../../data/task-datasource/service/task.service';
import { ITask } from '../../data/task-datasource/models/task.model';
import { FormsModule } from '@angular/forms';
import { sorting } from '../../shared/utils/sorting-function';
import { formatDate } from '../../shared/utils/format-dates.function';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public tasks: WritableSignal<ITask[]> = signal<ITask[]>([]);
  public searchText: WritableSignal<string> = signal<string>("");
  public startDate: string = '';
  public endDate: string = '';
  public ascSortName: boolean = false;
  public ascSortDate: boolean = false;

  constructor(
    private taskService: TaskService
  ) {
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: ITask[]) => {
        this.tasks.set(data);
        this.sortTasks("date", this.ascSortDate)
      }, error: (err: any) => {
        console.log(err);
      }
    });
  }

  onTypeSearchBar(event: Event): void {
    const text = event.target as HTMLInputElement;
    this.searchText.update((value) => value = text.value);
    if (this.searchText() === '' || this.searchText === null) {
      this.getTasks();
    }
  }

  filterBySearchBar() {
    this.taskService.getTaskBySearch(this.searchText()).subscribe({
      next: (data: ITask[]) => {
        this.tasks.update((value) => value = data);
      }, error: (err: any) => {
        console.log(err);
      }
    });
  }

  filterByStatus(event: Event) {
    const option = event.target as HTMLInputElement;
    this.taskService.getTaskByStatus(option.value).subscribe({
      next: (data: ITask[]) => {
        this.tasks.update((value) => value = data);
      }, error: (err: any) => {
        console.log(err);
      }
    });
  }

  filterByDatesRange() {
    this.taskService.getTaskByDatesRange(this.startDate, this.endDate).subscribe({
      next: (data: ITask[]) => {
        this.tasks.update((value) => value = data);
      }, error: (err: any) => {
        console.log(err);
      }
    });
  }

  sortTasks(property: string, asc: boolean) {
    if (property === 'name') {
      this.tasks.update((value) =>
        value = value.sort((a, b) => {
          return sorting(a.name, b.name, asc);
        })
      );
    } else {
      this.tasks.update((value) =>
        value = value.sort((a, b) => {
          return sorting(a.dateCreated!, b.dateCreated!, asc);
        })
      );
    }
  }

}
