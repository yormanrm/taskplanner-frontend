import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StorageService } from '../core/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  
  constructor(
    private storageService: StorageService,
    private router: Router
  ){}

  closeSession(){
    alert("Goodbye");
    this.storageService.removeSessionItem('jwt');
    this.router.navigate(['/authentication']);
  }

}
