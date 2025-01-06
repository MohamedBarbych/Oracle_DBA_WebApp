import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  form: FormGroup;
  message: string = '';
  success: boolean = true;
  isLoading: boolean = false;
  alertVisible: boolean = false;
  alertMessage: string = '';
  alertType: string = ''; // success or error

  constructor(
    private titleService: Title,
    private userService: UserService,
    private router: Router
  ) {
    this.titleService.setTitle('Create User');
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      roles: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    // Optionally check if the user already exists here if needed before form submission
  }

  // Function to show the custom alert
  showAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;
    this.alertVisible = true;

    // Automatically hide the alert after 5 seconds
    setTimeout(() => {
      this.alertVisible = false;
    }, 5000);
  }

  // Handle form submission
  onSubmit() {
    if (this.form.valid) {
      const { username, password, roles } = this.form.value;

      this.isLoading = true; // Show loading spinner
      // setTimeout(() => {
      //   this.alertVisible = false;
      // }, 5000);

      // Ajout d'un délai avant de continuer
      setTimeout(() => {

        this.userService.createUser(username, password, roles).subscribe({

          next: (response) => {
            // if (response === 'user created') {
              this.isLoading = false;
              this.showAlert('User created successfully', 'success');
              this.form.reset(); // Reset the form après succès
            },
          // },
          error: () => {
            this.isLoading = false;
            this.showAlert('Error creating the user', 'error');
          }
        });
      }, 5000); // Temps d'attente en millisecondes (2 secondes)
    }
  }


  // Method to create a new user
  // createNewUser(username: string, password: string, roles: string) {
  //   this.userService.createUser(username, password, roles).subscribe({
  //     next: (response) => {
  //       if (response === 'user created') {
  //         this.isLoading = false;
  //         this.showAlert('User created successfully', 'success');
  //         this.form.reset(); // Reset the form after successful creation
  //       }
  //     },
  //     error: () => {
  //       this.isLoading = false;
  //       this.showAlert('Error creating the user', 'error');
  //     }
  //   });

}
