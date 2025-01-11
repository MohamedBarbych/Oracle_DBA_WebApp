import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { TestParticlesComponent } from "./test-particles/test-particles.component";
import { ParticulesComponent } from "./components/shared/particules/particules.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule], // Include RouterModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Oracle DBA';
}
