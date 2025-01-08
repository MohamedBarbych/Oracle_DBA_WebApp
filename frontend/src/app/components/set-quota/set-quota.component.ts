import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';  // <-- Import necessary classes
import { CommonModule } from '@angular/common';  // <-- Make sure this is imported
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-set-quota',
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NavbarComponent
],
  templateUrl: './set-quota.component.html',
  styleUrl: './set-quota.component.css'
})
export class SetQuotaComponent {

  form: FormGroup;
  message: string = '';
  success: boolean = true;
  isLoading: boolean = false;
  alertVisible: boolean = false;
  alertMessage: string = '';
  alertType: string = ''; // success or error
  username: any;
  quota: any;



  constructor(

    private titleService: Title,
    private userService: UserService,
    private router: Router
  ) {
    this.titleService.setTitle('Set-Quota');

  // Initialize the form with validators
  this.form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    quota: new FormControl('', [Validators.required]),
  });
  }

  ngOnInit() {
    // Optionally check if the user already exists here if needed before form submission
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


  onSubmit() {
    if (this.form.valid) {
      const { username, quota } = this.form.value;
      this.isLoading = true;

      setTimeout(() => {

      this.userService.setUserQuota(username,quota).subscribe({
        next: (response) => {
          // if (response === 'user created') {
            this.isLoading = false;
            this.showAlert('quota asigned successfully', 'success');
            this.form.reset(); // Reset the form après succès
          },
        // },
        error: () => {
          this.isLoading = false;
          this.showAlert('Error asigning the quota, Verify if the user already exists', 'error');
        }
      });
    }, 2000);

    }
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
