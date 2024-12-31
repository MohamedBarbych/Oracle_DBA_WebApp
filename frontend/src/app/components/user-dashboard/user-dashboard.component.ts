import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Import Chart.js
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements AfterViewInit {
  constructor(private titleService: Title) {
    // Set the page title
    this.titleService.setTitle('User - Dashboard');
  }

  // Lifecycle hook to initialize charts after the view is rendered
  ngAfterViewInit(): void {
    this.initializePortfolioChart();
    this.initializePerformanceChart();
  }

  // Method to initialize the portfolio allocation chart
  private initializePortfolioChart(): void {
    const portfolioCtx = document.getElementById('portfolioChart') as HTMLCanvasElement;
    if (portfolioCtx) {
      new Chart(portfolioCtx, {
        type: 'pie',
        data: {
          labels: ['Stocks', 'ETFs', 'Bonds', 'Crypto'],
          datasets: [
            {
              data: [40, 30, 20, 10],
              backgroundColor: ['#007bff', '#6f42c1', '#e83e8c', '#ffc107'],
            },
          ],
        },
      });
    }
  }

  // Method to initialize the performance trends chart
  // Method to initialize the enhanced performance trends chart
private initializePerformanceChart(): void {
  const performanceTrendsCtx = document.getElementById('performanceTrendsChart') as HTMLCanvasElement;
  if (performanceTrendsCtx) {
    new Chart(performanceTrendsCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Portfolio Value',
            data: [1000, 1500, 2000, 2700, 3400, 4200, 5000],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            pointBackgroundColor: '#007bff',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#007bff',
            tension: 0.4, // Smooth curves
            borderWidth: 3,
          },
          {
            label: 'Market Index',
            data: [950, 1450, 1950, 2500, 3200, 4000, 4700],
            borderColor: '#28a745',
            backgroundColor: 'rgba(40, 167, 69, 0.2)',
            pointBackgroundColor: '#28a745',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#28a745',
            tension: 0.4, // Smooth curves
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) =>
                `${tooltipItem.dataset.label}: $${tooltipItem.raw.toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Months',
              font: {
                size: 14,
                weight: 'bold',
              },
              color: '#555',
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: 'Portfolio Value ($)',
              font: {
                size: 14,
                weight: 'bold',
              },
              color: '#555',
            },
            ticks: {
              callback: (value: any) => `$${value.toLocaleString()}`,
            },
          },
        },
      },
    });
  }
}

}
