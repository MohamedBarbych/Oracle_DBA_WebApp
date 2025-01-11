import { Component, OnInit } from '@angular/core';
import { loadFull } from 'tsparticles';
import { NgParticlesModule } from 'ng-particles';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-particules',
  standalone: true,
  imports: [NgParticlesModule],
  templateUrl: './particules.component.html',
  styleUrls: ['./particules.component.css'],
})
export class ParticulesComponent implements OnInit {
  id = 'tsparticles';
  particlesOptions: any;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    // Load the configuration file dynamically
    this.http.get('assets/particlesjs-config.json').subscribe((config) => {
      this.particlesOptions = config;
    });
  }

  particlesInit(engine: any): Promise<void> {
    return loadFull(engine);
  }
}
