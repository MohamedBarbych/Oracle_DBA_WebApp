import {Component, Type} from '@angular/core';
import {BackupService} from '../../services/backup.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common'; // Import DatePipe
import { NavbarComponent } from '../shared/navbar/navbar.component';


interface BackupEntry{
  type: string;
  setCount: string;
  startTime: string;
  completionTime: string;
  originalLine?: string;
}
@Component({
  selector: 'app-backup',
  imports: [
    NavbarComponent,
    NgIf,
    NgForOf,
    DatePipe,
    NgClass
  ],
  templateUrl: './backup.component.html',
  styleUrl: './backup.component.css'
})
export class BackupComponent {
  backupHistory: BackupEntry[] = [];
  loading = false;
  backupInProgress: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private backupService: BackupService) { }

  ngOnInit(): void {
    this.loadBackupHistory();
  }

  loadBackupHistory(): void {
    this.loading = true;
    this.errorMessage = null;
    this.backupService.getBackupHistory().subscribe({
      next: (history) => {
        this.backupHistory = this.parseBackupHistory(history);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load backup history.';
      },
      complete:() => {
        this.loading = false;
      }
    });
  }
  parseBackupHistory(history:string[]): BackupEntry[] {
    return history.map(line => {
      const matchType = line.match(/Type: ([^,]+)/);
      const matchSetCount = line.match(/Set Count: ([^,]+)/);
      const matchStartTime = line.match(/Start Time: ([^,]+)/);
      const matchCompletionTime = line.match(/Completion Time: ([^,]+)/);

      return {
        type: matchType ? matchType[1] : 'N/A',
        setCount: matchSetCount ? matchSetCount[1] : 'N/A',
        startTime: matchStartTime ? matchStartTime[1] : 'N/A',
        completionTime: matchCompletionTime ? matchCompletionTime[1] : 'N/A',
        originalLine: !matchType ? line : undefined // Store the original line if parsing fails
      };
    });
  }
  triggerFullBackup(): void {
    this.backupInProgress = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.backupService.triggerFullBackup().subscribe({
      next: (response) => {
        this.successMessage = response;
        this.loadBackupHistory()
        this.backupInProgress = false;
      },
      error: (error) => {
        this.errorMessage = error.error || 'Failed to trigger full backup.';
        this.backupInProgress = false;
      },
    });
  }


  triggerIncrementalBackup(): void {
    this.backupInProgress = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.backupService.triggerIncrementalBackup().subscribe({
      next:(response) => {
        this.successMessage = response;
        this.loadBackupHistory()
        this.backupInProgress = false;
      },
      error: (error) => {
        this.errorMessage = error.error || 'Failed to trigger incremental backup.';
        this.backupInProgress = false;
      },
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
