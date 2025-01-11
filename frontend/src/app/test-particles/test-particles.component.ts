import { Component } from '@angular/core';
import { ParticulesComponent } from '../components/shared/particules/particules.component'; // Adjust the path as needed

@Component({
  selector: 'app-test-particles',
  standalone: true,
  imports: [ParticulesComponent], // Import the ParticulesComponent
  templateUrl: './test-particles.component.html',
  styleUrls: ['./test-particles.component.css'],
})
export class TestParticlesComponent {}
