import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css'],
})
export class UserDashComponent implements AfterViewInit {
  // ViewChild pour capturer les éléments canvas
  @ViewChild('revenueLineChart') revenueLineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('portfolioDoughnutChart') portfolioDoughnutChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('performanceBarChart') performanceBarChartRef!: ElementRef<HTMLCanvasElement>;

  // Après l'initialisation des vues
  ngAfterViewInit(): void {
    this.renderLineChart();
    this.renderDoughnutChart();
    this.renderBarChart();
  }

  // 1. Line Chart (Revenue Growth)
  renderLineChart() {
    new Chart(this.revenueLineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            data: [1200, 1500, 1600, 1800, 2000, 2500],
            label: 'Predicted Revenue ($)',
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13, 110, 253, 0.3)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
        },
      },
    });
  }

  // 2. Doughnut Chart (Portfolio Distribution)
  renderDoughnutChart() {
    new Chart(this.portfolioDoughnutChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Stocks', 'Crypto', 'Bonds', 'Real Estate'],
        datasets: [
          {
            data: [35, 25, 20, 20],
            backgroundColor: ['#007bff', '#ffc107', '#28a745', '#dc3545'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' },
        },
      },
    });
  }

  // 3. Bar Chart (Quarterly Performance)
  renderBarChart() {
    new Chart(this.performanceBarChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            data: [3000, 4500, 6000, 7000],
            label: 'Quarterly Income ($)',
            backgroundColor: '#17a2b8',
          },
          {
            data: [2000, 2500, 4000, 6000],
            label: 'Quarterly Expenses ($)',
            backgroundColor: '#e83e8c',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
        },
        indexAxis: 'x',
      },
    });
  }
}
