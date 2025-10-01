import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  // Datos de biografía
  personalInfo = {
    name: 'Matías Arroyo',
    title: 'Estudiante de Computer Science',
    university: 'Universidad Francisco Marroquín',
    period: '2024 - 2027',
    description: 'Estudiante apasionado por la tecnología y el desarrollo de software. Actualmente cursando Computer Science en la Universidad Francisco Marroquín, con interés especial en el desarrollo web y las aplicaciones móviles.',
    interests: [
      'Desarrollo Web',
      'Aplicaciones Móviles',
      'Inteligencia Artificial',
      'Videojuegos',
      'Tecnología'
    ],
    goals: 'Mi objetivo es convertirme en un desarrollador full-stack competente, contribuyendo a proyectos innovadores que impacten positivamente en la sociedad.'
  };
}
