import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxParticlesModule } from '@tsparticles/angular';
import { loadFull } from 'tsparticles';

// Importation du fichier JSON
import particlesConfig from '/home/med/MyProjects/OracleProject/frontend/public/assets/particlesjs-config.json';

@Component({
  selector: 'app-particules-dash',
  standalone: true,
  imports: [NgxParticlesModule], // Correct module import
  templateUrl: './particules-dash.component.html',
  styleUrls: ['./particules-dash.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ParticulesComponentDash implements OnInit {
  id = 'particles-background'; // ID for the ngx-particles container
  particlesOptions: any = {}; // Options for particles

  async particlesInit(engine: any): Promise<void> {
    console.log('Particles Engine Loaded:', engine); // Debug log for initialization
    await loadFull(engine); // Load the tsparticles engine
  }

  particlesLoaded(container: any): void {
    console.log('Particles loaded:', container); // Debug log for loaded particles
  }

  ngOnInit(): void {
    // Charger les options depuis le fichier JSON importé
    this.particlesOptions = particlesConfig;
  }
}
