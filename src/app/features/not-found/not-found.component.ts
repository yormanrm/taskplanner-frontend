import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'feature-not-found',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {}