import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';
import { Chart } from 'chart.js/auto'; // Import Chart.js
import { CommonModule } from '@angular/common'; // Import CommonModule for json pipe
import { NgIf, NgFor } from '@angular/common';
import { NavbarComponent } from "../shared/navbar/navbar.component"; // Explicitly import Angular directives

@Component({
  selector: 'app-resource-usage',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './resource-usage.component.html',
  styleUrl: './resource-usage.component.css'
})
export class ResourceUsageComponent implements OnInit {

  awrReport: any[] = [];
  ashReport: any[] = [];
  realtimeStatsChart!: Chart;
  resourceUsageChart!: Chart;
  cpuPerformanceChart!: Chart;

  constructor(private performanceService: PerformanceService) {}

  ngOnInit(): void {
    this.loadResourceUsage();

  }

  resourceMetrics: any[] = [];

  loadResourceUsage() {
    this.performanceService.getResourceUsage().subscribe((data) => {
      // Extract labels and values for the doughnut chart
      const labels = data.map((usage: any) => usage.NAME);
      const values = data.map((usage: any) => usage.VALUE);

      // Render the doughnut chart
      this.resourceUsageChart = new Chart('resourceUsageChart', {
        type: 'doughnut',
        data: {
          labels,
          datasets: [
            {
              label: 'Resource Usage Breakdown',
              data: values,
              backgroundColor: [
                '#FF6384', // Red
                '#36A2EB', // Blue
                '#FFCE56', // Yellow
                '#4BC0C0', // Green
                '#9966FF', // Purple
                '#FF9F40', // Orange
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: 'bottom' },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const value = tooltipItem.raw as number; // Explicit cast
                  return `${tooltipItem.label}: ${value.toLocaleString()} units`;
                },
              },
            },
          },
        },
      });

      // Prepare data for the new CPU performance chart
      const cpuMetric = data.find((usage: any) => usage.NAME === 'CPU used by this session');
      const dbTimeMetric = data.find((usage: any) => usage.NAME === 'DB time');

      const cpuPerformanceLabels = ['CPU Used', 'Idle Time'];
      const cpuUsed = cpuMetric ? cpuMetric.VALUE : 0;
      const dbTime = dbTimeMetric ? dbTimeMetric.VALUE : 1; // Avoid division by 0

      const cpuIdle = dbTime - cpuUsed; // Assuming idle time is the remaining DB time
      const cpuPerformanceValues = [cpuUsed, cpuIdle];

      // Render the new CPU performance bar chart
      this.cpuPerformanceChart = new Chart('cpuPerformanceChart', {
        type: 'bar',
        data: {
          labels: cpuPerformanceLabels,
          datasets: [
            {
              label: 'CPU Performance Details',
              data: cpuPerformanceValues,
              backgroundColor: ['#FF6384', '#36A2EB'],
              borderColor: ['#FF6384', '#36A2EB'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const value = tooltipItem.raw as number; // Explicit cast
                  return `${tooltipItem.label}: ${value.toLocaleString()} units`;
                },
              },
            },
          },
          scales: {
            x: {
              title: { display: true, text: 'Metric' },
            },
            y: {
              title: { display: true, text: 'Value' },
              beginAtZero: true,
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
