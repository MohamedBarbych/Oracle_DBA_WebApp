import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';
import { Chart } from 'chart.js/auto'; // Import Chart.js
import { CommonModule } from '@angular/common'; // Import CommonModule for json pipe
import { NgIf, NgFor } from '@angular/common';
import { NavbarComponent } from "../shared/navbar/navbar.component"; // Explicitly import Angular directives


@Component({
  selector: 'app-performance-dash',
  templateUrl: './performance-dash.component.html',
  styleUrls: ['./performance-dash.component.css'],
  standalone: true,
  imports: [NavbarComponent],
})
export class PerformanceDashComponent implements OnInit {
  realtimeStatsChart!: Chart;

  constructor(private performanceService: PerformanceService) {}

  ngOnInit(): void {
    this.loadRealtimeStats();
  }

  loadRealtimeStats() {
    this.performanceService.getRealtimeStats().subscribe((data) => {
      const metrics = ['User calls', 'DB time', 'Redo size'];
      const labels = [...new Set(data.map((stat: any) => stat.NAME))];

      // Map data for each metric
      const userCalls = data.filter((stat: any) => stat.NAME === 'User calls').map((stat: any) => stat.VALUE);
      const dbTime = data.filter((stat: any) => stat.NAME === 'DB time').map((stat: any) => stat.VALUE);
      const redoSize = data.filter((stat: any) => stat.NAME === 'Redo size').map((stat: any) => stat.VALUE);

      this.realtimeStatsChart = new Chart('realtimeStatsChart', {
        type: 'bar',
        data: {
          labels: metrics, // Metrics as labels
          datasets: [
            {
              label: 'User Calls',
              data: userCalls,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'DB Time',
              data: dbTime,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
            {
              label: 'Redo Size',
              data: redoSize,
              backgroundColor: 'rgba(255, 206, 86, 0.6)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: 'top' },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Values',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Metrics',
              },
            },
          },
        },
      });
    });
  }



  ngAfterViewInit(): void {
    // Initialize features after DOM is rendered
    this.initSpinner();
    this.initWOW();
    this.initFixedNavbar();
    this.initBackToTop();
    this.initCounters();
    this.initProjectCarousel();
    this.initTestimonialCarousel();
    this.initHeaderCarousel();
  }

  private initSpinner(): void {
    const spinner = document.getElementById('spinner');
    if (spinner) {
      setTimeout(() => {
        spinner.classList.remove('show');
      }, 1);
    }
  }

  private initWOW(): void {
    // Initialize WOW.js animations
    if ((window as any).WOW) {
      new (window as any).WOW().init();
    }
  }

  private initFixedNavbar(): void {
    const fixedTop = document.querySelector('.fixed-top') as HTMLElement;
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      if (window.innerWidth < 992) {
        fixedTop?.classList.toggle('bg-white', scrollTop > 45);
        fixedTop?.classList.toggle('shadow', scrollTop > 45);
      } else {
        fixedTop?.classList.toggle('bg-white', scrollTop > 45);
        fixedTop?.classList.toggle('shadow', scrollTop > 45);
        if (fixedTop) {
          fixedTop.style.top = scrollTop > 6 ? '-6px' : '0';
        }
      }
    });
  }

  private initBackToTop(): void {
    const backToTop = document.querySelector('.back-to-top') as HTMLElement;
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTop.style.display = 'block';
        } else {
          backToTop.style.display = 'none';
        }
      });

      backToTop.addEventListener('click', (event: Event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  private initCounters(): void {
    const counterElements = document.querySelectorAll<HTMLElement>('[data-toggle="counter-up"]');
    if ((window as any).CounterUp) {
      counterElements.forEach((el) => {
        const counterUp = (window as any).CounterUp.default;
        counterUp(el, { delay: 10, time: 2000 });
      });
    }
  }

  private initProjectCarousel(): void {
    const projectCarousel = document.querySelector('.project-carousel');
    if ((window as any).OwlCarousel && projectCarousel) {
      new (window as any).OwlCarousel(projectCarousel, {
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
        responsive: {
          0: { items: 1 },
          576: { items: 1 },
          768: { items: 2 },
          992: { items: 3 },
        },
      });
    }
  }

  private initTestimonialCarousel(): void {
    // Initialize Owl Carousel for testimonials
    (('.testimonial-carousel') as any).owlCarousel({
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 1000,
      dots: true,
      loop: true,
      nav: false,
      margin: 30,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
      },
    });
  }

  private initHeaderCarousel(): void {
    const carousel = document.getElementById('header-carousel');
    if (carousel) {
      const bootstrapCarousel = new (window as any).bootstrap.Carousel(carousel, {
        interval: 2000, // Auto-slide every 2 seconds
        ride: 'carousel', // Automatic sliding
      });
    }
  }





}
