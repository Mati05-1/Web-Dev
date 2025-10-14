import { Injectable } from '@angular/core';

export interface Skill {
  name: string;
  dataSkill: string;
  visible: boolean;
  highlighted: boolean;
}

export interface Job {
  period: string;
  company: string;
  position: string;
  description: string;
  responsibilities: string[];
  technologies?: string[];
}

export interface Study {
  period: string;
  institution: string;
  title: string;
  description: string;
  achievements?: string[];
  skills?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  // Skills data
  skills: string[] = ['Angular', 'TypeScript', 'CSS', 'HTML', 'JavaScript'];
  
  // Jobs data
  jobs: string[] = ['Frontend Dev', 'Backend Dev', 'Fullstack Dev'];
  
  // Detailed skills for skills page
  technologies: Skill[] = [
    { name: 'Git', dataSkill: 'git', visible: true, highlighted: false },
    { name: 'GitHub', dataSkill: 'github', visible: true, highlighted: false },
    { name: 'Unity', dataSkill: 'unity', visible: true, highlighted: false },
    { name: 'Flask', dataSkill: 'flask', visible: true, highlighted: false },
    { name: 'Flutter', dataSkill: 'flutter', visible: true, highlighted: false },
    { name: 'Angular', dataSkill: 'angular', visible: true, highlighted: false },
    { name: 'Bootstrap', dataSkill: 'bootstrap', visible: true, highlighted: false },
    { name: 'Node.js', dataSkill: 'nodejs', visible: true, highlighted: false }
  ];
  
  languages: Skill[] = [
    { name: 'Python', dataSkill: 'python', visible: true, highlighted: false },
    { name: 'Java (básico)', dataSkill: 'java', visible: true, highlighted: false },
    { name: 'C# (básico)', dataSkill: 'csharp', visible: true, highlighted: false },
    { name: 'TypeScript', dataSkill: 'typescript', visible: true, highlighted: false },
    { name: 'JavaScript', dataSkill: 'javascript', visible: true, highlighted: false },
    { name: 'HTML', dataSkill: 'html', visible: true, highlighted: false },
    { name: 'CSS', dataSkill: 'css', visible: true, highlighted: false }
  ];
  
  softSkills: Skill[] = [
    { name: 'Comunicación', dataSkill: 'comunicacion', visible: true, highlighted: false },
    { name: 'Adaptabilidad', dataSkill: 'adaptabilidad', visible: true, highlighted: false },
    { name: 'Buena gestión del tiempo', dataSkill: 'gestion-tiempo', visible: true, highlighted: false },
    { name: 'Trabajo en equipo', dataSkill: 'trabajo-equipo', visible: true, highlighted: false },
    { name: 'Organización', dataSkill: 'organizacion', visible: true, highlighted: false },
    { name: 'Resolución de problemas', dataSkill: 'resolucion-problemas', visible: true, highlighted: false },
    { name: 'Creatividad', dataSkill: 'creatividad', visible: true, highlighted: false },
    { name: 'Aprendizaje continuo', dataSkill: 'aprendizaje-continuo', visible: true, highlighted: false }
  ];

  // Detailed jobs data
  jobsData: Job[] = [
    {
      period: '2023 - 2024',
      company: 'Hospital Veterinario',
      position: 'Asistente General',
      description: 'Trabajé como asistente general en un hospital veterinario, donde desarrollé habilidades de trabajo en equipo, atención al cliente y manejo de situaciones de presión.',
      responsibilities: [
        'Atención al cliente y recepción',
        'Apoyo en procedimientos veterinarios',
        'Mantenimiento de registros médicos',
        'Trabajo en equipo bajo presión',
        'Manejo de inventario y suministros'
      ],
      technologies: ['Sistemas de gestión', 'Registros médicos digitales']
    },
    {
      period: '2022',
      company: 'Torneo de Tenis',
      position: 'Recojebolas',
      description: 'Participé como recojebolas en un torneo de tenis profesional, desarrollando habilidades de responsabilidad, puntualidad y trabajo en equipo.',
      responsibilities: [
        'Recolección de pelotas durante partidos',
        'Mantenimiento del orden en la cancha',
        'Apoyo logístico del evento',
        'Trabajo bajo presión y horarios estrictos',
        'Coordinación con el equipo de arbitraje'
      ],
      technologies: ['Equipos deportivos', 'Sistemas de puntuación']
    }
  ];

  // Detailed studies data
  studiesData: Study[] = [
    {
      period: '2024 - 2027',
      institution: 'Universidad Francisco Marroquín',
      title: 'Computer Science',
      description: 'Estudiante de Computer Science con enfoque en desarrollo de software, algoritmos y estructuras de datos. Actualmente cursando materias fundamentales de programación y matemáticas.',
      skills: ['Programación', 'Algoritmos', 'Estructuras de Datos', 'Matemáticas']
    }
  ];

  constructor() { }

  // Methods to get data
  getSkills(): string[] {
    return this.skills;
  }

  getJobs(): string[] {
    return this.jobs;
  }

  getTechnologies(): Skill[] {
    return this.technologies;
  }

  getLanguages(): Skill[] {
    return this.languages;
  }

  getSoftSkills(): Skill[] {
    return this.softSkills;
  }

  getJobsData(): Job[] {
    return this.jobsData;
  }

  getStudiesData(): Study[] {
    return this.studiesData;
  }
}
