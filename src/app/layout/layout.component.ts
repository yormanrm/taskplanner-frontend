import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StorageService } from '../core/services/storage.service';
import { Router, RouterModule } from '@angular/router';
import { SweetalertService } from '../core/services/sweetalert.service';
import { IJwtToken } from '../data/authentication-datasource/models/jwt-token.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  
  constructor(
    private storageService: StorageService,
    private sweetAlertService: SweetalertService,
    private router: Router
  ){}

  closeSession(){
    const user: IJwtToken = this.storageService.getSessionItem('jwt');
    this.sweetAlertService.toastAlert('See you again ' + user.name, 'success', "bottom");
    this.storageService.removeSessionItem('jwt');
    this.router.navigate(['/authentication']);
  }

}