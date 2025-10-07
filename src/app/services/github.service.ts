import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface GitHubProject {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  topics: string[];
  forks_count: number;
  open_issues_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly GITHUB_API_URL = 'https://api.github.com';
  private readonly USERNAME = 'Mati05-1';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los repositorios públicos del usuario
   */
  getUserRepositories(): Observable<GitHubProject[]> {
    const url = `${this.GITHUB_API_URL}/users/${this.USERNAME}/repos`;
    
    return this.http.get<any[]>(url).pipe(
      map(repos => this.mapRepositoriesToProjects(repos)),
      catchError(error => {
        console.error('Error fetching GitHub repositories:', error);
        // Retornar datos de ejemplo en caso de error
        return of(this.getFallbackProjects());
      })
    );
  }

  /**
   * Obtiene repositorios específicos por nombre
   */
  getSpecificRepositories(repoNames: string[]): Observable<GitHubProject[]> {
    const requests = repoNames.map(repoName => 
      this.http.get<any>(`${this.GITHUB_API_URL}/repos/${this.USERNAME}/${repoName}`)
    );

    return this.http.get<any[]>(`${this.GITHUB_API_URL}/users/${this.USERNAME}/repos`).pipe(
      map(repos => {
        const filteredRepos = repos.filter(repo => repoNames.includes(repo.name));
        return this.mapRepositoriesToProjects(filteredRepos);
      }),
      catchError(error => {
        console.error('Error fetching specific repositories:', error);
        return of(this.getFallbackProjects());
      })
    );
  }

  /**
   * Mapea los datos de la API de GitHub al formato de nuestro proyecto
   */
  private mapRepositoriesToProjects(repos: any[]): GitHubProject[] {
    return repos
      .filter(repo => !repo.fork) // Excluir forks
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()) // Ordenar por fecha de actualización
      .slice(0, 6) // Limitar a 6 proyectos
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || 'Sin descripción disponible',
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        language: repo.language || null,
        updated_at: repo.updated_at,
        created_at: repo.created_at,
        topics: repo.topics || [],
        forks_count: repo.forks_count,
        open_issues_count: repo.open_issues_count
      }));
  }

  /**
   * Datos de fallback en caso de que la API no esté disponible
   */
  private getFallbackProjects(): GitHubProject[] {
    return [
      {
        id: 1,
        name: 'cv-angular',
        full_name: 'Mati05-1/cv-angular',
        description: 'CV interactivo desarrollado con Angular - Mi proyecto principal',
        html_url: 'https://github.com/Mati05-1/cv-angular',
        stargazers_count: 0,
        language: 'TypeScript',
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        topics: ['angular', 'typescript', 'cv', 'portfolio'],
        forks_count: 0,
        open_issues_count: 0
      },
      {
        id: 2,
        name: 'proyecto-ejemplo-react',
        full_name: 'Mati05-1/proyecto-ejemplo-react',
        description: 'Aplicación web desarrollada con React y Node.js',
        html_url: 'https://github.com/Mati05-1/proyecto-ejemplo-react',
        stargazers_count: 3,
        language: 'JavaScript',
        updated_at: new Date(Date.now() - 86400000).toISOString(), // 1 día atrás
        created_at: new Date(Date.now() - 2592000000).toISOString(), // 30 días atrás
        topics: ['react', 'javascript', 'nodejs'],
        forks_count: 1,
        open_issues_count: 2
      },
      {
        id: 3,
        name: 'app-movil-flutter',
        full_name: 'Mati05-1/app-movil-flutter',
        description: 'Aplicación móvil desarrollada con Flutter para gestión de tareas',
        html_url: 'https://github.com/Mati05-1/app-movil-flutter',
        stargazers_count: 8,
        language: 'Dart',
        updated_at: new Date(Date.now() - 172800000).toISOString(), // 2 días atrás
        created_at: new Date(Date.now() - 5184000000).toISOString(), // 60 días atrás
        topics: ['flutter', 'dart', 'mobile', 'app'],
        forks_count: 2,
        open_issues_count: 1
      }
    ];
  }

  /**
   * Formatea la fecha para mostrar de manera legible
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Hace 1 día';
    } else if (diffDays < 7) {
      return `Hace ${diffDays} días`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return weeks === 1 ? 'Hace 1 semana' : `Hace ${weeks} semanas`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? 'Hace 1 mes' : `Hace ${months} meses`;
    } else {
      const years = Math.floor(diffDays / 365);
      return years === 1 ? 'Hace 1 año' : `Hace ${years} años`;
    }
  }
}