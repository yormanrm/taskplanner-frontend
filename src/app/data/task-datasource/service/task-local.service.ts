import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { TaskAPIService } from './task-api.service';
import { ITask } from '../models/task.model';
import { sorting } from '../../../shared/utils/sorting-function';

@Injectable({
  providedIn: 'root'
})
export class TaskLocalService {
  private taskApiService = inject(TaskAPIService);

  public tasks: WritableSignal<ITask[]> = signal<ITask[]>([]);
  public searchText: WritableSignal<string> = signal<string>("");
  public ascSortName: boolean = false;
  public ascSortDate: boolean = false;

  constructor() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskApiService.getTasks().subscribe({
      next: (data: ITask[]) => {
        this.tasks.set(data);
        this.sortTasks("date", false);
      }, error: (err: any) => {
        console.log(err);
      }
    });
  }

  onTypeSearchBar(event: Event): void {
    const text = event.target as HTMLInputElement;
    setTimeout(() => {
      this.searchText.update((value) => value = text.value);
      if (this.searchText() === '' || this.searchText === null) {
        this.getTasks();
      } else {
        this.filterBySearchBar();
      }
    }, 900);
  }

  filterBySearchBar() {
    this.taskApiService.getTaskBySearch(this.searchText()).subscribe({
      next: (data: ITask[]) => {
        this.tasks.set(data);
        this.sortTasks("date", false);
      }, error: (err: any) => {
        console.log(err);
      }
    });
  }

  filterByStatus(event: Event) {
    const option = event.target as HTMLInputElement;
    this.taskApiService.getTaskByStatus(option.value).subscribe({
      next: (data: ITask[]) => {
        this.tasks.set(data);
        this.sortTasks("date", false);
      }, error: (err: any) => {
        console.log(err);
      }
    });
  }

  filterByDatesRange(startDate: string, endDate: string) {
    this.taskApiService.getTaskByDatesRange(startDate, endDate).subscribe({
      next: (data: ITask[]) => {
        this.tasks.set(data);
        this.sortTasks("date", false);
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

