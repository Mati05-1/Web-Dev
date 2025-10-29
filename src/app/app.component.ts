import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { SkillsComponent, Skill } from './components/skills/skills.component';
import { EducationComponent, EducationRecord } from './components/education/education.component';
import { ExperienceComponent, ExperienceRecord } from './components/experience/experience.component';

// Declarar moment para TypeScript
declare const moment: any;

// La interfaz Skill ahora se importa desde SkillsComponent

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, HeaderComponent, ContactInfoComponent, SkillsComponent, EducationComponent, ExperienceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cv-angular-app';
  
  // Contacto
  contactVisible = false;
  
  // Experiencia ahora se maneja en ExperienceComponent
  
  // Habilidades - ahora se pasan al SkillsComponent
  technologies: Skill[] = [
    { name: 'Git', dataSkill: 'git', visible: true, highlighted: false },
    { name: 'GitHub', dataSkill: 'github', visible: true, highlighted: false },
    { name: 'Unity', dataSkill: 'unity', visible: true, highlighted: false },
    { name: 'Flask', dataSkill: 'flask', visible: true, highlighted: false },
    { name: 'Flutter', dataSkill: 'flutter', visible: true, highlighted: false }
  ];
  
  languages: Skill[] = [
    { name: 'Python', dataSkill: 'python', visible: true, highlighted: false },
    { name: 'Java (básico)', dataSkill: 'java', visible: true, highlighted: false },
    { name: 'C# (básico)', dataSkill: 'csharp', visible: true, highlighted: false }
  ];
  
  softSkills: Skill[] = [
    { name: 'Comunicación', dataSkill: 'comunicacion', visible: true, highlighted: false },
    { name: 'Adaptabilidad', dataSkill: 'adaptabilidad', visible: true, highlighted: false },
    { name: 'Buena gestión del tiempo', dataSkill: 'gestion-tiempo', visible: true, highlighted: false },
    { name: 'Trabajo en equipo', dataSkill: 'trabajo-equipo', visible: true, highlighted: false },
    { name: 'Organización', dataSkill: 'organizacion', visible: true, highlighted: false }
  ];
  
  // Datos de educación
  educationRecords: EducationRecord[] = [
    {
      year: '2024 - 2027',
      institution: 'Universidad Francisco Marroquín',
      title: 'Computer Science'
    }
  ];
  
  // Datos de experiencia
  experienceRecords: ExperienceRecord[] = [
    {
      period: '2023 - 2024',
      company: 'Hospital Veterinario',
      position: 'Asistente general'
    },
    {
      period: '2022',
      company: 'Torneo de Tenis',
      position: 'Recojebolas'
    }
  ];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Inicialización del componente principal
  }

  ngOnDestroy() {
    // Cleanup del componente principal
  }

  // Método de experiencia ahora se maneja en ExperienceComponent

  // Funcionalidad de contacto
  toggleContact() {
    this.contactVisible = !this.contactVisible;
  }

  // Manejar cambio de tema desde el header
  onThemeToggle() {
    // El tema ya se maneja en el HeaderComponent
  }

  // Métodos de habilidades ahora se manejan en SkillsComponent

  // Descargar HTML
  downloadHTML() {
    if (isPlatformBrowser(this.platformId)) {
      const contenido = document.documentElement.outerHTML;
      const blob = new Blob([contenido], { type: 'text/html' });
      const enlace = document.createElement('a');
      enlace.href = URL.createObjectURL(blob);
      enlace.download = 'mi_cv.html';
      enlace.click();
    }
  }
}
