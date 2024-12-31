import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-kyc-trigger-page',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './kyc-trigger-page.component.html',
  styleUrl: './kyc-trigger-page.component.css'
})
export class KycTriggerPageComponent {
  constructor(private titleService: Title) {
    // Set the page title
    this.titleService.setTitle('KYC Verification');
  }
}
