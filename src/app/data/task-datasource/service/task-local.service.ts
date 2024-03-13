import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { TaskAPIService } from './task-api.service';
import { ITask } from '../models/task.model';
import { sorting } from '../../../shared/utils/sorting-function';

@Injectable({
  providedIn: 'root'
})
export class TaskLocalService {
  private taskApiService = inject(TaskAPIService);

  public localTasks: WritableSignal<ITask[]> = signal<ITask[]>([]);
  public searchText: WritableSignal<string> = signal<string>("");
  public existFilter: WritableSignal<boolean> = signal<boolean>(false);
  public ascSortName: boolean = false;
  public ascSortDate: boolean = false;

  constructor() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskApiService.getTasks().subscribe({
      next: (data: ITask[]) => {
        this.localTasks.set(data);
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
        this.existFilter.set(false);
      } else {
        this.filterBySearchBar();
        this.existFilter.set(true);
      }
    }, 900);
  }

  filterBySearchBar() {
    this.taskApiService.getTaskBySearch(this.searchText()).subscribe({
      next: (data: ITask[]) => {
        this.localTasks.set(data);
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
        this.localTasks.set(data);
        this.sortTasks("date", false);
      }, error: (err: any) => {
        console.log(err);
      }
    });
  }

  filterByDatesRange(startDate: string, endDate: string) {
    this.existFilter.set(true);
    this.taskApiService.getTaskByDatesRange(startDate, endDate).subscribe({
      next: (data: ITask[]) => {
        this.localTasks.set(data);
        this.sortTasks("date", false);
      }, error: (err: any) => {
        console.log(err);
      }
    });
  }

  sortTasks(property: string, asc: boolean) {
    if (property === 'name') {
      this.localTasks.update((value) =>
        value = value.sort((a, b) => {
          return sorting(a.name, b.name, asc);
        })
      );
    } else {
      this.localTasks.update((value) =>
        value = value.sort((a, b) => {
          return sorting(a.dateCreated!, b.dateCreated!, asc);
        })
      );
    }
  }

}

