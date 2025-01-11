import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OptimizationService } from '../../services/optimization.service';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NavbarComponent} from '../shared/navbar/navbar.component';


@Component({
  selector: 'app-optimization',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule,NavbarComponent], // Ajout de FormsModule ici
  templateUrl: './optimization.component.html',
  styleUrls: ['./optimization.component.css']
})
export class OptimizationComponent implements OnInit {

  slowQueries: any[] = [];
  searchText: string = '';
  filteredQueries: any[] = [];
  optimizationResult: string = '';
  optimizationReport: string = '';
  pageSize: number = 3;
  currentPage: number = 1;
  pagedQueries: any[] = [];
  totalPages: number = 1;

  constructor(private optimizationService: OptimizationService) { }

  ngOnInit(): void {
    this.getSlowQueries();
  }

  optimizeQuery(queryId: string): void {
    this.optimizationService.optimizeQuery(queryId).subscribe({
      next: (response) => {
        console.log('Optimization result: ', response);
        this.optimizationResult = response;
        this.showModal();
      },
      error: (error) => {
        console.error('Erreur d\'optimisation', error);
        this.optimizationResult = 'Failed to optimize query.';
        this.showModal();
      }
    });
  }

  loadSlowQueries(): void {
    this.optimizationService.getSlowQueries().subscribe({
      next: (data) => {
        this.slowQueries = data;
        this.applyPagination();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des requêtes lentes', error);
      },
    });
  }

  getSlowQueries() {
    this.optimizationService.getSlowQueries().subscribe({
      next: (data) => {
        this.slowQueries = data;
        this.filteredQueries = data;
        this.applyPagination();
      },
      error: (error) => {
        console.error('Erreur lors de la recuperation', error);
      }
    });
  }

  searchQueries(): void {
    if (this.searchText) {
      this.filteredQueries = this.slowQueries.filter(query =>
        query.sql_text.toLowerCase().includes(this.searchText.toLowerCase()) ||
        query.sql_id.toString().includes(this.searchText)
      );
    } else {
      this.filteredQueries = this.slowQueries;
    }
    this.applyPagination();
  }

  applyPagination(): void {
    this.totalPages = Math.ceil(this.filteredQueries.length / this.pageSize);
    this.updatePagedQueries();
  }


  updatePagedQueries(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedQueries = this.filteredQueries.slice(startIndex, endIndex);
  }


  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedQueries();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedQueries();
    }
  }
  goToPage(page: number): void {
    if(page >= 1 && page <= this.totalPages){
      this.currentPage = page;
      this.updatePagedQueries();
    }

  }


  showModal() {
    const modalElement = document.getElementById('resultModal') as HTMLElement;
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error("Modal element with id 'resultModal' not found in the DOM.");
    }
  }

  getPageNumbers(): number[] {
    const visiblePages = 5; // Nombre de boutons de page visibles
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const pages: number[] = [];

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculer les boutons de page à afficher
      let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
      let endPage = Math.min(totalPages, startPage + visiblePages - 1);

      // Si startPage est trop loin, ajuster startPage et endPage
      if (endPage - startPage + 1 < visiblePages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    return pages;
  }

  // to fix the crazy navbar

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
}}
