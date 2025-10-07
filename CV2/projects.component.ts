import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService, GitHubProject } from '../../services/github.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: GitHubProject[] = [];
  loading = true;
  error = '';
  lastUpdated = '';

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.loadProjects();
  }

  async loadProjects() {
    try {
      this.loading = true;
      this.error = '';
      
      // Intentar obtener proyectos reales de GitHub
      this.githubService.getUserRepositories().subscribe({
        next: (projects) => {
          this.projects = projects;
          this.loading = false;
          this.lastUpdated = new Date().toLocaleString('es-ES');
        },
        error: (error) => {
          console.error('Error loading projects:', error);
          this.error = 'No se pudieron cargar los proyectos desde GitHub';
          this.loading = false;
        }
      });
    } catch (error) {
      this.error = 'Error al conectar con GitHub';
      this.loading = false;
    }
  }

  formatDate(dateString: string): string {
    return this.githubService.formatDate(dateString);
  }

  getLanguageColor(language: string | null): string {
    if (!language) return '#6c757d';
    
    const colors: { [key: string]: string } = {
      'TypeScript': '#3178c6',
      'JavaScript': '#f7df1e',
      'Dart': '#00d4aa',
      'Python': '#3776ab',
      'Java': '#ed8b00',
      'C#': '#239120',
      'HTML': '#e34f26',
      'CSS': '#1572b6',
      'PHP': '#777bb4',
      'Go': '#00add8',
      'Rust': '#000000',
      'Kotlin': '#7f52ff',
      'Swift': '#fa7343'
    };
    return colors[language] || '#6c757d';
  }

  getProjectTopics(project: GitHubProject): string[] {
    return project.topics.slice(0, 3); // Mostrar máximo 3 topics
  }

  getProjectBadgeText(project: GitHubProject): string {
    const webLanguages = ['HTML', 'CSS', 'JavaScript', 'TypeScript'];
    const webTopics = ['web', 'frontend', 'web-development', 'html', 'css', 'javascript', 'typescript', 'angular', 'react', 'vue'];

    const isWebProjectByLanguage = project.language && webLanguages.includes(project.language);
    const isWebProjectByTopic = project.topics.some(topic => webTopics.includes(topic.toLowerCase()));

    if (isWebProjectByLanguage || isWebProjectByTopic) {
      // Si es un proyecto web, mostrar las tecnologías web principales
      const relevantLanguages: string[] = [];
      
      // Agregar el lenguaje principal si es web
      if (project.language && webLanguages.includes(project.language)) {
        relevantLanguages.push(project.language);
      }
      
      // Agregar tecnologías de los topics
      if (project.topics.includes('html') && !relevantLanguages.includes('HTML')) relevantLanguages.push('HTML');
      if (project.topics.includes('css') && !relevantLanguages.includes('CSS')) relevantLanguages.push('CSS');
      if (project.topics.includes('javascript') && !relevantLanguages.includes('JavaScript')) relevantLanguages.push('JavaScript');
      if (project.topics.includes('typescript') && !relevantLanguages.includes('TypeScript')) relevantLanguages.push('TypeScript');

      // Si no se detectaron tecnologías específicas pero es un proyecto web, mostrar las básicas
      if (relevantLanguages.length === 0) {
        return 'HTML, CSS, JS';
      }

      // Si solo tiene una tecnología web, completar con las básicas
      if (relevantLanguages.length === 1) {
        const singleLang = relevantLanguages[0];
        if (singleLang === 'HTML') return 'HTML, CSS, JS';
        if (singleLang === 'CSS') return 'HTML, CSS, JS';
        if (singleLang === 'JavaScript') return 'HTML, CSS, JS';
        if (singleLang === 'TypeScript') return 'TypeScript, HTML, CSS';
      }

      // Eliminar duplicados y ordenar
      const uniqueLanguages = [...new Set(relevantLanguages)].sort();
      return uniqueLanguages.join(', ');
    }
    
    return project.language || 'General';
  }
}
