import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';  // <-- Import necessary classes
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../shared/navbar/navbar.component";  // <-- Make sure this is imported

@Component({
  selector: 'app-update-user',
  standalone: true,  // Using standalone component
  imports: [
    CommonModule, // CommonModule for basic Angular directives like ngIf, ngFor
    ReactiveFormsModule // Importing ReactiveFormsModule
    ,
    NavbarComponent
],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  form: FormGroup;
  message: string = '';
  success: boolean = true;
  isLoading: boolean = false;
  alertVisible: boolean = false;
  alertMessage: string = '';
  alertType: string = '';

  constructor(
    private titleService: Title,
    private userService: UserService,
    private router: Router
  ) {
    this.titleService.setTitle('Update User');

    // Initialize the form with validators
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      roles: new FormControl('', [Validators.required]),
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

  onSubmit() {
    if (this.form.valid) {
      const { username, password, roles } = this.form.value;

      this.isLoading = true;  // Show loading spinner when submitting the form


      setTimeout(() => {

        this.userService.updateUser(username, password, roles).subscribe({

          next: (response) => {
            // if (response === 'user created') {
              this.isLoading = false;
              this.showAlert('User updated successfully', 'success');
              this.form.reset(); // Reset the form après succès
            },
          // },
          error: () => {



            this.isLoading = false;
            this.showAlert('Error updating the user, User may not exist !', 'error');
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
