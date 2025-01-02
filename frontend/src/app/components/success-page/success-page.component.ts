import { Component } from '@angular/core';

@Component({
  selector: 'app-success-page',
  imports: [],
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.css'
})
export class SuccessPageComponent {
  successMessage: string = 'Operation completed successfully!';
}
