import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Education } from '../../services/api.service';

export interface Certificate {
  id: number;
  name: string;
  institution: string;
  date: string;
  description: string;
  credentialId?: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements OnInit {
  education: Education[] = [];
  certificates: Certificate[] = [];
  loading = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadEducationFromAPI();
    this.loadCertificates();
  }

  loadEducationFromAPI() {
    this.loading = true;
    this.error = null;
    
    this.apiService.getEducation().subscribe({
      next: (education) => {
        this.education = education;
        this.loading = false;
        console.log('Education loaded from API:', education);
      },
      error: (error) => {
        this.error = 'Error al cargar educación desde la API';
        this.loading = false;
        console.error('Error loading education:', error);
      }
    });
  }

  loadCertificates() {
    // Datos estáticos de certificados
    this.certificates = [
      {
        id: 1,
        name: 'Certificación en Desarrollo Web Frontend',
        institution: 'Google Developers',
        date: '2024',
        description: 'Certificación completa en tecnologías web modernas incluyendo HTML5, CSS3, JavaScript ES6+ y frameworks como Angular.',
        credentialId: 'GD-FE-2024-001'
      },
      {
        id: 2,
        name: 'Programación en Python para Principiantes',
        institution: 'Coursera - Universidad de Michigan',
        date: '2023',
        description: 'Curso especializado en programación Python cubriendo fundamentos, estructuras de datos, algoritmos y desarrollo de aplicaciones.',
        credentialId: 'UM-PY-2023-002'
      }
    ];
  }

  refreshData() {
    this.loadEducationFromAPI();
  }
}
