import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OptimizationService } from '../../services/optimization.service';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms'; // Import FormsModule


@Component({
  selector: 'app-optimization',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule], // Ajout de FormsModule ici
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
}
