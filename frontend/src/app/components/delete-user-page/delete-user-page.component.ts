import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delete-user-page',
  imports: [],
  templateUrl: './delete-user-page.component.html',
  styleUrl: './delete-user-page.component.css'
})
export class DeleteUserPageComponent {
  username: string = '';
  isLoading: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.username.trim()) {
      this.isLoading = true;
      this.userService.deleteUser(this.username).subscribe({
        next: (response) => {
          // Assuming successful deletion, navigate to success page
          this.router.navigate(['/success-page']);
        },
        error: (error) => {
          // Handle error, e.g., show failure page
          this.router.navigate(['/failure-page']);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
