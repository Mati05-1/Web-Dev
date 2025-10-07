import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

export interface GitHubProject {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: GitHubProject[] = [];
  loading = true;
  error = '';

  constructor() {}

  ngOnInit() {
    this.loadProjects();
  }

  async loadProjects() {
    try {
      this.loading = true;
      // Por ahora usaremos datos de ejemplo, después conectaremos con la API real
      this.projects = [
        {
          id: 1,
          name: 'cv-angular',
          full_name: 'Mati05-1/cv-angular',
          description: 'CV interactivo desarrollado con Angular',
          html_url: 'https://github.com/Mati05-1/cv-angular',
          stargazers_count: 0,
          language: 'TypeScript',
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          name: 'proyecto-ejemplo-1',
          full_name: 'Mati05-1/proyecto-ejemplo-1',
          description: 'Proyecto de ejemplo con React',
          html_url: 'https://github.com/Mati05-1/proyecto-ejemplo-1',
          stargazers_count: 5,
          language: 'JavaScript',
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          name: 'proyecto-ejemplo-2',
          full_name: 'Mati05-1/proyecto-ejemplo-2',
          description: 'Aplicación móvil con Flutter',
          html_url: 'https://github.com/Mati05-1/proyecto-ejemplo-2',
          stargazers_count: 12,
          language: 'Dart',
          updated_at: new Date().toISOString()
        }
      ];
      this.loading = false;
    } catch (error) {
      this.error = 'Error al cargar los proyectos';
      this.loading = false;
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES');
  }
}