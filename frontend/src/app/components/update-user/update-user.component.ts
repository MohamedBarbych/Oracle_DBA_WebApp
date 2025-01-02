import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';  // <-- Import necessary classes
import { CommonModule } from '@angular/common';  // <-- Make sure this is imported

@Component({
  selector: 'app-update-user',
  standalone: true,  // Using standalone component
  imports: [
    CommonModule,          // CommonModule for basic Angular directives like ngIf, ngFor
    ReactiveFormsModule    // Importing ReactiveFormsModule
  ],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(
    private titleService: Title,
    private userService: UserService,
    private router: Router
  ) {
    this.titleService.setTitle('Update User');

    // Initialize the form with validators
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      roles: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { username, password, roles } = this.form.value;

      this.isLoading = true;  // Show loading spinner when submitting the form

      this.userService.updateUser(username, password, roles).subscribe({
        next: (response) => {
          // Redirect to success page on successful update
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
