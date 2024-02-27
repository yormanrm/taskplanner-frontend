import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskLocalService } from '../../data/task-datasource/service/task-local.service';

@Component({
  selector: 'feature-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public taskLocalService = inject(TaskLocalService);
}