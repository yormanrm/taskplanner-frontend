import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../models/response/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = environment.apiUrl + "tasks";
  private http = inject(HttpClient);

  saveTask(body: any): Observable<ITask> {
    return this.http.post<ITask>(this.url + "/save", body);
  }

  getAllTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url + "/get/all");
  }

  getATask(id: number): Observable<ITask> {
    let params = new HttpParams();
    params = params.append("id", id);
    return this.http.get<ITask>(this.url + "/get/byId", { params: params });
  }

  getTaskByStatus(status: string): Observable<ITask[]> {
    let params = new HttpParams();
    params = params.append("status", status);
    return this.http.get<ITask[]>(this.url + "/get/byStatus", { params: params });
  }

  getTaskBySearch(search: string): Observable<ITask[]> {
    let params = new HttpParams();
    params = params.append("search", search);
    return this.http.get<ITask[]>(this.url + "/get/bySearch", { params: params });
  }

  updateTaskStatus(id: number, status: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("id", id);
    params = params.append("status", status);
    return this.http.post<any>(this.url + "/updateStatus", { params: params });
  }

  deleteATask(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.append("id", id);
    return this.http.delete<any>(this.url + "/delete", { params: params });
  }

}
