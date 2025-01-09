import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';
import { Chart } from 'chart.js/auto'; // Import Chart.js
import { CommonModule } from '@angular/common'; // Import CommonModule for json pipe
import { NgIf, NgFor } from '@angular/common';
import { NavbarComponent } from "../shared/navbar/navbar.component"; // Explicitly import Angular directives
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-awr-report',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './awr-report.component.html',
  styleUrl: './awr-report.component.css'
})
export class AwrReportComponent {
  awrRealtimeChart!: Chart;
  dataPoints: number[] = [];
  labels: string[] = [];
  apiSubscription!: Subscription;

  constructor(private performanceService: PerformanceService) {}

  ngOnInit(): void {
    this.initChart();
    this.startTracking();
  }

  ngOnDestroy(): void {
    // Cleanup when leaving the page
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }

  // Initialize the line chart
  initChart(): void {
    this.awrRealtimeChart = new Chart('awrRealtimeChart', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'DB Time (ms)',
            data: this.dataPoints,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
        },
        scales: {
          x: { title: { display: true, text: 'Time' } },
          y: { title: { display: true, text: 'DB Time (ms)' } },
        },
      },
    });
  }

  // Start tracking the data by making periodic API calls
  startTracking(): void {
    this.apiSubscription = interval(3000).subscribe(() => {
      this.performanceService.getAWRReport().subscribe((data) => {
        const dbTime = data[0]?.VALUE || 0;
        const currentTime = new Date().toLocaleTimeString();

        // Update the chart data
        this.dataPoints.push(dbTime);
        this.labels.push(currentTime);

        // Keep only the last 10 data points for better visualization
        if (this.dataPoints.length > 10) {
          this.dataPoints.shift();
          this.labels.shift();
        }

        // Update the chart
        this.awrRealtimeChart.update();
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
