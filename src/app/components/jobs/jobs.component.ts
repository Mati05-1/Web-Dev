import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Job } from '../../data.service';
import { ApiService, Experience } from '../../services/api.service';
import { ReversePipe } from '../../pipes/reverse.pipe';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, ReversePipe],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  basicJobs: string[] = [];
  apiExperiences: Experience[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private dataService: DataService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // Datos estáticos de trabajos reales
    this.jobs = [
      {
        period: '2022 - 2023',
        company: 'Hospital Veterinario',
        position: 'Asistente Veterinario',
        description: 'Trabajé en diferentes áreas del hospital veterinario realizando diversas tareas de apoyo al equipo médico y administrativo.',
        responsibilities: [
          'Asistencia en consultas veterinarias',
          'Cuidado y alimentación de animales hospitalizados',
          'Limpieza y mantenimiento de instalaciones',
          'Apoyo en procedimientos médicos básicos',
          'Atención al cliente y gestión de citas',
          'Inventario de medicamentos y suministros'
        ],
        technologies: ['Sistemas de gestión veterinaria', 'Equipos médicos básicos']
      },
      {
        period: '2023',
        company: 'Torneo de Tenis Nacional',
        position: 'Recogebolas',
        description: 'Participé como recogebolas en un torneo de tenis nacional, desarrollando habilidades de trabajo en equipo y bajo presión.',
        responsibilities: [
          'Recolección rápida y eficiente de pelotas durante los partidos',
          'Coordinación con otros recogebolas para mantener el ritmo del juego',
          'Atención a las señales de los árbitros y jugadores',
          'Mantenimiento del orden y limpieza de la cancha',
          'Trabajo en equipo bajo condiciones de presión',
          'Respeto por las reglas y protocolos del torneo'
        ],
        technologies: ['Equipos de comunicación', 'Sistemas de puntuación']
      }
    ];
    this.basicJobs = this.dataService.getJobs();
    
    // Load experiences from API
    this.loadExperiencesFromAPI();
  }

  loadExperiencesFromAPI() {
    this.loading = true;
    this.error = null;
    
    this.apiService.getExperiences().subscribe({
      next: (experiences) => {
        this.apiExperiences = experiences;
        this.loading = false;
        console.log('Experiences loaded from API:', experiences);
      },
      error: (error) => {
        this.error = 'Error al cargar experiencias desde la API';
        this.loading = false;
        console.error('Error loading experiences:', error);
      }
    });
  }

  refreshData() {
    this.loadExperiencesFromAPI();
  }
}
