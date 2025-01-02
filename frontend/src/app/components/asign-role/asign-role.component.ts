import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';  // <-- Import necessary classes
import { CommonModule } from '@angular/common';  // <-- Make sure this is imported

@Component({
  selector: 'app-assign-role',
  standalone: true,  // Using standalone component
  imports: [
    CommonModule,          // CommonModule for basic Angular directives like ngIf, ngFor
    ReactiveFormsModule    // Importing ReactiveFormsModule
  ],
  templateUrl: './asign-role.component.html',
  styleUrls: ['./asign-role.component.css']
})
export class AssignRoleComponent {
  username: string = '';
  role: string = '';
  isLoading: boolean = false;

  constructor(
    private titleService: Title,
    private userService: UserService,
    private router: Router
  ) {
    this.titleService.setTitle('Assign Role');
  }

  onSubmit() {
    if (this.username.trim() && this.role) {
      this.isLoading = true;
      this.userService.assignRoleToUser(this.username, this.role).subscribe({
        next: (response) => {
          // Redirect to success page on successful role assignment
          this.router.navigate(['/success-page']);
        },
        error: (error) => {
          // Redirect to failure page on error
          this.router.navigate(['/failure-page']);
        },
        complete: () => {
          this.isLoading = false;  // Reset loading state
        }
      });
    }
  }
}
