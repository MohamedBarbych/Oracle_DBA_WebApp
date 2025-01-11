import { Component, OnInit } from '@angular/core';
import { NgParticlesModule } from 'ng-particles';
import { loadFull } from 'tsparticles'; // Corrected import
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-particules',
  standalone: true,
  imports: [NgParticlesModule], // Import the Angular wrapper
  templateUrl: './particules.component.html',
  styleUrls: ['./particules.component.css']
})
export class ParticulesComponent implements OnInit {
  id = 'particles-background';
  particlesOptions: any;
  particlesUrl = 'assets/particlesjs-config.json'; // Dynamic configuration file

  constructor(private http: HttpClient) {}

  async particlesInit(engine: any): Promise<void> {
    console.log('Particles Engine Loaded:', engine); // Debug
    await loadFull(engine);
  }
  

  particlesLoaded(container: any): void {
    console.log('Particles loaded:', container);
  }

  ngOnInit(): void {
    this.http.get(this.particlesUrl).subscribe((config) => {
      this.particlesOptions = config;
    });
  }
}
