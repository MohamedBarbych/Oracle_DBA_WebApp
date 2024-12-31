import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-email-verif-notif',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './email-verif-notif.component.html',
  styleUrl: './email-verif-notif.component.css'
})
export class EmailVerifNotifComponent {
  constructor(private titleService: Title) {
    // Set the page title
    this.titleService.setTitle('Email Verification');
  }
}
