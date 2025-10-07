import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface EducationRecord {
  year: string;
  institution: string;
  title: string;
}

@Component({
  selector: 'app-education',
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  @Input() educationRecords: EducationRecord[] = [];
  
  // Datos por defecto si no se pasan desde el padre
  defaultEducation: EducationRecord[] = [
    {
      year: '2024 - 2027',
      institution: 'Universidad Francisco Marroquín',
      title: 'Computer Science'
    }
  ];
  
  ngOnInit() {
    // Si no se pasan datos desde el padre, usar los por defecto
    if (this.educationRecords.length === 0) {
      this.educationRecords = this.defaultEducation;
    }
  }
}