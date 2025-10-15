import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interfaces para los datos de la API
export interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  period: string;
  description: string;
  gpa: string;
  courses: string[];
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
  percentage: number;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  relationship: string;
  testimonial: string;
  rating: number;
  contact: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  // ========================================
  // EXPERIENCIAS LABORALES
  // ========================================

  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/experiences`)
      .pipe(
        catchError(error => {
          console.error('Error fetching experiences:', error);
          // Datos de fallback si la API no está disponible
          return of([
            {
              id: 1,
              company: "Tech Solutions Inc",
              position: "Frontend Developer",
              period: "2023 - Presente",
              description: "Desarrollo de aplicaciones web modernas usando Angular y TypeScript",
              technologies: ["Angular", "TypeScript", "SCSS", "RxJS"],
              achievements: ["Mejoré el rendimiento de la app en 40%", "Implementé testing automatizado"]
            },
            {
              id: 2,
              company: "StartupXYZ",
              position: "Junior Developer",
              period: "2022 - 2023",
              description: "Desarrollo full-stack de aplicaciones web",
              technologies: ["React", "Node.js", "MongoDB", "Express"],
              achievements: ["Lancé 3 features principales", "Reduje bugs en producción en 60%"]
            }
          ]);
        })
      );
  }

  getExperience(id: number): Observable<Experience> {
    return this.http.get<Experience>(`${this.apiUrl}/experiences/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching experience ${id}:`, error);
          throw error;
        })
      );
  }

  createExperience(experience: Omit<Experience, 'id'>): Observable<Experience> {
    return this.http.post<Experience>(`${this.apiUrl}/experiences`, experience)
      .pipe(
        catchError(error => {
          console.error('Error creating experience:', error);
          throw error;
        })
      );
  }

  updateExperience(id: number, experience: Partial<Experience>): Observable<Experience> {
    return this.http.patch<Experience>(`${this.apiUrl}/experiences/${id}`, experience)
      .pipe(
        catchError(error => {
          console.error(`Error updating experience ${id}:`, error);
          throw error;
        })
      );
  }

  deleteExperience(id: number): Observable<Experience> {
    return this.http.delete<Experience>(`${this.apiUrl}/experiences/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting experience ${id}:`, error);
          throw error;
        })
      );
  }

  // ========================================
  // EDUCACIÓN
  // ========================================

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.apiUrl}/education`)
      .pipe(
        catchError(error => {
          console.error('Error fetching education:', error);
          // Datos de fallback si la API no está disponible
          return of([
            {
              id: 1,
              institution: "Universidad Francisco Marroquín",
              degree: "Computer Science",
              period: "2024 - 2027",
              description: "Estudiante de Ciencias de la Computación",
              gpa: "3.8",
              courses: ["Algoritmos", "Estructuras de Datos", "Base de Datos", "Desarrollo Web"]
            }
          ]);
        })
      );
  }

  getEducationById(id: number): Observable<Education> {
    return this.http.get<Education>(`${this.apiUrl}/education/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching education ${id}:`, error);
          throw error;
        })
      );
  }

  createEducation(education: Omit<Education, 'id'>): Observable<Education> {
    return this.http.post<Education>(`${this.apiUrl}/education`, education)
      .pipe(
        catchError(error => {
          console.error('Error creating education:', error);
          throw error;
        })
      );
  }

  updateEducation(id: number, education: Partial<Education>): Observable<Education> {
    return this.http.patch<Education>(`${this.apiUrl}/education/${id}`, education)
      .pipe(
        catchError(error => {
          console.error(`Error updating education ${id}:`, error);
          throw error;
        })
      );
  }

  deleteEducation(id: number): Observable<Education> {
    return this.http.delete<Education>(`${this.apiUrl}/education/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting education ${id}:`, error);
          throw error;
        })
      );
  }

  // ========================================
  // HABILIDADES
  // ========================================

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`)
      .pipe(
        catchError(error => {
          console.error('Error fetching skills:', error);
          // Datos de fallback si la API no está disponible
          return of([
            {
              id: 1,
              name: "Angular",
              category: "Frontend",
              level: "Avanzado",
              percentage: 85,
              description: "Framework de desarrollo web"
            },
            {
              id: 2,
              name: "TypeScript",
              category: "Lenguaje",
              level: "Intermedio",
              percentage: 75,
              description: "Lenguaje de programación tipado"
            },
            {
              id: 3,
              name: "JavaScript",
              category: "Lenguaje",
              level: "Avanzado",
              percentage: 90,
              description: "Lenguaje de programación web"
            },
            {
              id: 4,
              name: "CSS/SCSS",
              category: "Frontend",
              level: "Intermedio",
              percentage: 70,
              description: "Estilos y diseño web"
            },
            {
              id: 5,
              name: "Node.js",
              category: "Backend",
              level: "Intermedio",
              percentage: 65,
              description: "Runtime de JavaScript para backend"
            }
          ]);
        })
      );
  }

  getSkillById(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/skills/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching skill ${id}:`, error);
          throw error;
        })
      );
  }

  createSkill(skill: Omit<Skill, 'id'>): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiUrl}/skills`, skill)
      .pipe(
        catchError(error => {
          console.error('Error creating skill:', error);
          throw error;
        })
      );
  }

  updateSkill(id: number, skill: Partial<Skill>): Observable<Skill> {
    return this.http.patch<Skill>(`${this.apiUrl}/skills/${id}`, skill)
      .pipe(
        catchError(error => {
          console.error(`Error updating skill ${id}:`, error);
          throw error;
        })
      );
  }

  deleteSkill(id: number): Observable<Skill> {
    return this.http.delete<Skill>(`${this.apiUrl}/skills/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting skill ${id}:`, error);
          throw error;
        })
      );
  }

  // ========================================
  // TESTIMONIOS
  // ========================================

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.apiUrl}/testimonials`)
      .pipe(
        catchError(error => {
          console.error('Error fetching testimonials:', error);
          // Datos de fallback si la API no está disponible
          return of([
            {
              id: 1,
              name: "María González",
              position: "Tech Lead",
              company: "Tech Solutions Inc",
              relationship: "Supervisor directo",
              testimonial: "Matías es un desarrollador excepcional. Su capacidad para resolver problemas complejos y su dedicación al aprendizaje continuo lo hacen un activo invaluable para cualquier equipo.",
              rating: 5,
              contact: "maria.gonzalez@techsolutions.com"
            },
            {
              id: 2,
              name: "Carlos Rodríguez",
              position: "Senior Developer",
              company: "StartupXYZ",
              relationship: "Colega de trabajo",
              testimonial: "Trabajar con Matías fue una experiencia increíble. Su pasión por el código limpio y su habilidad para aprender nuevas tecnologías rápidamente son impresionantes.",
              rating: 5,
              contact: "carlos.rodriguez@startupxyz.com"
            },
            {
              id: 3,
              name: "Ana Martínez",
              position: "Profesora",
              company: "Universidad Francisco Marroquín",
              relationship: "Profesora universitaria",
              testimonial: "Matías es uno de los estudiantes más destacados. Su curiosidad intelectual y su capacidad para aplicar conceptos teóricos en proyectos prácticos son excepcionales.",
              rating: 5,
              contact: "ana.martinez@ufm.edu"
            }
          ]);
        })
      );
  }

  getTestimonialById(id: number): Observable<Testimonial> {
    return this.http.get<Testimonial>(`${this.apiUrl}/testimonials/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching testimonial ${id}:`, error);
          throw error;
        })
      );
  }

  createTestimonial(testimonial: Omit<Testimonial, 'id'>): Observable<Testimonial> {
    return this.http.post<Testimonial>(`${this.apiUrl}/testimonials`, testimonial)
      .pipe(
        catchError(error => {
          console.error('Error creating testimonial:', error);
          throw error;
        })
      );
  }

  updateTestimonial(id: number, testimonial: Partial<Testimonial>): Observable<Testimonial> {
    return this.http.patch<Testimonial>(`${this.apiUrl}/testimonials/${id}`, testimonial)
      .pipe(
        catchError(error => {
          console.error(`Error updating testimonial ${id}:`, error);
          throw error;
        })
      );
  }

  deleteTestimonial(id: number): Observable<Testimonial> {
    return this.http.delete<Testimonial>(`${this.apiUrl}/testimonials/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting testimonial ${id}:`, error);
          throw error;
        })
      );
  }
}
