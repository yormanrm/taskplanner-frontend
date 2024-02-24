import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StorageService } from '../core/services/storage.service';
import { Router, RouterModule } from '@angular/router';
import { filter, fromEvent, map } from 'rxjs';

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
    private router: Router
  ) {
    fromEvent(window, 'resize')
      .pipe(
        filter(() => window.innerWidth < 1500),
        map(() => window.innerWidth)
      )
      .subscribe((width) => {
        console.log(`Window width is now less than 1500: ${width}`);
      });
  }

  signOut() {
    alert("Goodbye");
    this.storageService.removeSessionItem('jwt');
    this.router.navigate(['/authentication']);
  }

}
