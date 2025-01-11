import { Component } from '@angular/core';
import { ParticulesComponent } from '../shared/particules/particules.component';


@Component({
  selector: 'app-success-page',
  imports: [ParticulesComponent],
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.css'
})
export class SuccessPageComponent {
  successMessage: string = 'Operation completed successfully!';
}
