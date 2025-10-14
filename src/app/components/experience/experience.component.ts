import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ExperienceRecord {
  period: string;
  company: string;
  position: string;
  description?: string;
  responsibilities?: string[];
}

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  @Input() experienceRecords: ExperienceRecord[] = [];
  @Input() visible: boolean = true;
  
  // Output para comunicar cambios de visibilidad al componente padre
  @Output() visibilityChange = new EventEmitter<boolean>();
  
  // Datos por defecto si no se pasan desde el padre
  defaultExperience: ExperienceRecord[] = [
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
  
  ngOnInit() {
    // Si no se pasan datos desde el padre, usar los por defecto
    if (this.experienceRecords.length === 0) {
      this.experienceRecords = this.defaultExperience;
    }
  }
  
  // Toggle de visibilidad
  toggleVisibility() {
    this.visible = !this.visible;
    this.visibilityChange.emit(this.visible);
  }
}