import { Component } from '@angular/core';

@Component({
  selector: 'app-failure-page',
  imports: [],
  templateUrl: './failure-page.component.html',
  styleUrl: './failure-page.component.css'
})
export class FailurePageComponent {
  failureMessage: string = 'Something went wrong. Please try again later.';

}
