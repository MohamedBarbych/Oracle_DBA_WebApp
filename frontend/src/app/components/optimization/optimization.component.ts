import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Import Chart.js
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-optimization',
  standalone: true,
  imports: [ RouterModule, CommonModule],
  templateUrl: './optimization.component.html',
  styleUrls: ['./optimization.component.css']
})
export class OptimizationComponent implements OnInit, AfterViewInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Optimization Management');
  }

  ngOnInit(): void {
    // Initialisation des événements après la création du composant
    this.initBackToTop();
  }

  ngAfterViewInit(): void {
    // Initialisation des fonctionnalités après que le DOM soit rendu
    this.initSpinner();
    this.initWOW();
    this.initFixedNavbar();
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
    if ((window as any).WOW) {
      new (window as any).WOW().init();
    }
  }

  private initFixedNavbar(): void {
    const fixedTop = document.querySelector('.fixed-top') as HTMLElement;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const isMobile = window.innerWidth < 992;
      fixedTop?.classList.toggle('bg-white', scrollTop > 45);
      fixedTop?.classList.toggle('shadow', scrollTop > 45);

      if (!isMobile && fixedTop) {
        fixedTop.style.top = scrollTop > 6 ? '-6px' : '0';
      }
    };
    window.addEventListener('scroll', onScroll);
  }

  private initBackToTop(): void {
    const backToTop = document.querySelector('.back-to-top') as HTMLElement;
    if (backToTop) {
      const onScroll = () => {
        backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
      };

      const onClick = (event: Event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      window.addEventListener('scroll', onScroll);
      backToTop.addEventListener('click', onClick);
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
    const testimonialCarousel = document.querySelector('.testimonial-carousel') as HTMLElement;
    if ((window as any).OwlCarousel && testimonialCarousel) {
      new (window as any).OwlCarousel(testimonialCarousel, {
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
  }

  private initHeaderCarousel(): void {
    const carousel = document.getElementById('header-carousel');
    if (carousel) {
      new (window as any).bootstrap.Carousel(carousel, {
        interval: 2000, // Auto-slide every 2 seconds
        ride: 'carousel', // Automatic sliding
      });
    }
  }
}
