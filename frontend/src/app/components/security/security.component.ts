import { Component, AfterViewInit } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  standalone: true,
  imports: [NavbarComponent,NgxPaginationModule,CommonModule,NgIf,NgFor],
  styleUrls: ['./security.component.css'],
})


export class SecurityComponent {
  message: string = '';

  success: boolean = true;
  isLoading: boolean = false;
  alertVisible: boolean = false;
  alertMessage: string = '';
  alertType: string = '';
  constructor(private securityService: SecurityService) {}




  initCharts() {
    // Threats Detected Chart
    new Chart('securityThreatsChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Threats Detected',
            data: [5, 8, 12, 7, 10],
            borderColor: '#e32b2b',
            backgroundColor: 'rgba(227, 43, 43, 0.1)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
    });

    // Encryption Coverage Chart
    new Chart('dataEncryptionChart', {
      type: 'doughnut',
      data: {
        labels: ['Encrypted', 'Not Encrypted'],
        datasets: [
          {
            data: [80, 20],
            backgroundColor: ['#e32b2b', '#cccccc'],
          },
        ],
      },
    });

    // Audit Log Activity Chart
    new Chart('auditActivityChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Log Entries',
            data: [100, 120, 150, 130, 160],
            backgroundColor: '#e32b2b',
          },
        ],
      },
    });
  }


  initializeCharts() {
    const chart1 = new Chart('chart1', {
      type: 'doughnut',
      data: {
        labels: ['TDE', 'Audit', 'VPD Policy'],
        datasets: [
          {
            data: [50, 30, 20],
            backgroundColor: ['#e32b2b', '#f7b731', '#45aaf2'],
            hoverBackgroundColor: ['#c52828', '#e1a324', '#3c97d1']
          }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    const chart2 = new Chart('chart2', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
          {
            label: 'Security Events',
            data: [120, 150, 180],
            backgroundColor: '#e32b2b'
          }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  showAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;
    this.alertVisible = true;

    // Automatically hide the alert after 5 seconds
    setTimeout(() => {
      this.alertVisible = false;
    }, 5000);
  }


    configureTDE(): void {
      setTimeout(() => {
      const walletPassword = prompt('Enter Wallet Password:');
      if (walletPassword) {
        this.isLoading = true;
        this.securityService.configureTDE(walletPassword).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.showAlert('TDE configured successfully!', 'success');
          },
          error: (err) => {
            this.isLoading = false;
            this.showAlert('Error configuring TDE: ' + err.error, 'error');
          },
        });
      }
    }, 2000);
    }



    enableAudit(): void {
      setTimeout(() => {
      this.isLoading = true;
      this.securityService.enableSecurityAudit().subscribe({
        next: () => {
          this.isLoading = false;
          this.showAlert('Security audit enabled successfully!', 'success');
        },
        error: (err) => {
          this.isLoading = false;
          this.showAlert('Error enabling security audit: ' + err.error, 'error');
        },
      });
    }, 2000);
    }




    createVPDPolicy(): void {
      setTimeout(() => {
      this.isLoading = true;
      this.securityService.createVPDPolicy().subscribe({
        next: () => {
          this.isLoading = false;
          this.showAlert('VPD policy created successfully!', 'success');
        },
        error: (err) => {
          this.isLoading = false;
          this.showAlert('Error creating VPD policy: ' + err.error, 'error');
        },
      });
    }, 2000);
    }





    createVPDPolicyFunction(): void {
      setTimeout(() => {
      this.isLoading = true;
      this.securityService.createVPDPolicyFunction().subscribe({
        next: () => {
          this.isLoading = false;
          this.showAlert('VPD policy function created successfully!', 'success');
        },
        error: (err) => {
          this.isLoading = false;
          this.showAlert('Error creating VPD policy function: ' + err.error, 'error');
        },
      });
    }, 2000);
    }




  ngAfterViewInit(): void {
    // Initialize features after DOM is rendered
    this.initializeCharts();

        this.initCharts();
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
