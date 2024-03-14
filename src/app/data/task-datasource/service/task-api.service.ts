import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParamsBuilder } from '../../../core/utils/http-params-builder';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskAPIService {

  private url: string = environment.apiUrl + "tasks";
  private http = inject(HttpClient);
  private paramsBuilder = inject(HttpParamsBuilder);

  saveTask(body: any): Observable<ITask> {
    return this.http.post<ITask>(this.url + "/save", body);
  }

  getTasks(archived: boolean): Observable<ITask[]> {
    const params = this.paramsBuilder.builder({archived})
    return this.http.get<ITask[]>(this.url + "/get/all", {params: params});
  }

  getATask(id: number): Observable<ITask> {
    const params = this.paramsBuilder.builder({ id });
    return this.http.get<ITask>(this.url + "/get/byId", { params: params });
  }

  getTaskByStatus(status: string, archived: boolean): Observable<ITask[]> {
    const params = this.paramsBuilder.builder({ status, archived });
    return this.http.get<ITask[]>(this.url + "/get/byStatus", { params: params });
  }

  getTaskBySearch(search: string, archived: boolean): Observable<ITask[]> {
    const params = this.paramsBuilder.builder({ search, archived });
    return this.http.get<ITask[]>(this.url + "/get/bySearch", { params: params });
  }

  getTaskByDatesRange(startDate: string, endDate: string): Observable<ITask[]> {
    const params = this.paramsBuilder.builder({ startDate, endDate });
    return this.http.get<ITask[]>(this.url + "/get/byDatesRange", { params: params });
  }

  updateTaskStatus(id: number, status: string): Observable<any> {
    const params = this.paramsBuilder.builder({ id, status });
    return this.http.post<any>(this.url + "/updateStatus", { params: params });
  }

  updateTaskArchived(id: number, archived: boolean): Observable<any> {
    const params = this.paramsBuilder.builder({ id, archived });
    return this.http.post<any>(this.url + "/updateArchived", { params: params });
  }

  deleteATask(id: number): Observable<any> {
    const params = this.paramsBuilder.builder({ id });
    return this.http.delete<any>(this.url + "/delete", { params: params });
  }

}
