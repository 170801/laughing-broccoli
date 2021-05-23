import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CATEGORIES } from '../../shared/database/categories.database';
import { SettingsComponent } from '../user/settings/settings.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  categories = CATEGORIES;
  user!: any;
  constructor(private router: Router, private authService: AuthService, private dialog: MatDialog) {
    authService.currentUserObservable().subscribe(e => this.user = e);
  }

  logout(): void{
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(SettingsComponent);
  }

}
