import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-delete-user-page',
  templateUrl: './delete-user-page.component.html',
  styleUrls: ['./delete-user-page.component.css'],
  standalone: true,  // Standalone component flag
  imports: [FormsModule]  // Import FormsModule to support ngModel
})
export class DeleteUserPageComponent {
  username: string = '';
  isLoading: boolean = false;

  constructor(
    private titleService: Title,
    private userService: UserService,
    private router: Router
  ) {
    this.titleService.setTitle('Delete User');
  }

  onSubmit() {
    if (this.username.trim()) {
      this.isLoading = true;
      this.userService.deleteUser(this.username).subscribe({
        next: (response) => {
          this.router.navigate(['/success-page']);
        },
        error: (error) => {
          this.router.navigate(['/failure-page']);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
