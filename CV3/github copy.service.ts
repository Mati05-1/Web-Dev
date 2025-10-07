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
   * Obtiene los repositorios del usuario desde GitHub
   */
  getUserRepositories(): Observable<GitHubProject[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'CV-Angular-App'
    });

    return this.http.get<any[]>(`${this.GITHUB_API_URL}/users/${this.USERNAME}/repos`, { headers })
      .pipe(
        map(repos => this.mapRepositoriesToProjects(repos)),
        catchError(error => {
          console.error('Error fetching repositories:', error);
          return of(this.getFallbackProjects());
        })
      );
  }

  /**
   * Obtiene repositorios específicos por nombre
   */
  getSpecificRepositories(repoNames: string[]): Observable<GitHubProject[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'CV-Angular-App'
    });

    const requests = repoNames.map(repoName => 
      this.http.get<any>(`${this.GITHUB_API_URL}/repos/${this.USERNAME}/${repoName}`, { headers })
        .pipe(catchError(() => of(null)))
    );

    return new Observable(observer => {
      Promise.all(requests.map(req => req.toPromise()))
        .then(responses => {
          const validRepos = responses.filter(repo => repo !== null);
          const projects = this.mapRepositoriesToProjects(validRepos);
          observer.next(projects);
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching specific repositories:', error);
          observer.next(this.getFallbackProjects());
          observer.complete();
        });
    });
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
        name: 'CV-Angular',
        full_name: 'Mati05-1/CV-Angular',
        description: 'CV interactivo desarrollado con Angular',
        html_url: 'https://github.com/Mati05-1/CV-Angular',
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
        name: 'Web-Dev',
        full_name: 'Mati05-1/Web-Dev',
        description: 'Proyectos de desarrollo web',
        html_url: 'https://github.com/Mati05-1/Web-Dev',
        stargazers_count: 0,
        language: 'HTML',
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        topics: ['html', 'css', 'javascript', 'web'],
        forks_count: 0,
        open_issues_count: 0
      },
      {
        id: 3,
        name: 'Python-Projects',
        full_name: 'Mati05-1/Python-Projects',
        description: 'Proyectos desarrollados en Python',
        html_url: 'https://github.com/Mati05-1/Python-Projects',
        stargazers_count: 0,
        language: 'Python',
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        topics: ['python', 'programming', 'automation'],
        forks_count: 0,
        open_issues_count: 0
      }
    ];
  }

  /**
   * Formatea una fecha ISO a formato legible
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hace 1 día';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`;
    if (diffDays < 365) return `Hace ${Math.ceil(diffDays / 30)} meses`;
    return `Hace ${Math.ceil(diffDays / 365)} años`;
  }
}
