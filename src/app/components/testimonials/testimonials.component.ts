import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Testimonial } from '../../services/api.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [];
  loading = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTestimonialsFromAPI();
  }

  loadTestimonialsFromAPI() {
    this.loading = true;
    this.error = null;
    
    this.apiService.getTestimonials().subscribe({
      next: (testimonials) => {
        this.testimonials = testimonials;
        this.loading = false;
        console.log('Testimonials loaded from API:', testimonials);
      },
      error: (error) => {
        this.error = 'Error al cargar testimonios desde la API';
        this.loading = false;
        console.error('Error loading testimonials:', error);
      }
    });
  }

  refreshData() {
    this.loadTestimonialsFromAPI();
  }

  getStars(rating: number): string[] {
    return Array(rating).fill('★');
  }

  getEmptyStars(rating: number): string[] {
    return Array(5 - rating).fill('☆');
  }
}
