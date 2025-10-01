import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Skill {
  name: string;
  dataSkill: string;
  visible: boolean;
  highlighted: boolean;
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  // Inputs para recibir datos del componente padre
  @Input() technologies: Skill[] = [];
  @Input() languages: Skill[] = [];
  @Input() softSkills: Skill[] = [];
  
  // Outputs para comunicar cambios al componente padre
  @Output() skillSearchChange = new EventEmitter<string>();
  @Output() clearSearch = new EventEmitter<void>();
  
  // Estado local del componente
  skillSearchTerm = '';
  showNoResults = false;
  
  // Arrays filtrados para el template
  filteredTechnologies: Skill[] = [];
  filteredLanguages: Skill[] = [];
  filteredSoftSkills: Skill[] = [];
  
  ngOnInit() {
    // Inicializar arrays filtrados
    this.filteredTechnologies = [...this.technologies];
    this.filteredLanguages = [...this.languages];
    this.filteredSoftSkills = [...this.softSkills];
  }
  
  ngOnChanges() {
    // Actualizar arrays filtrados cuando cambien los inputs
    this.filteredTechnologies = [...this.technologies];
    this.filteredLanguages = [...this.languages];
    this.filteredSoftSkills = [...this.softSkills];
  }
  
  // Búsqueda de habilidades
  filterSkills() {
    const searchTerm = this.skillSearchTerm.toLowerCase().trim();
    
    // Filtrar tecnologías
    this.filteredTechnologies = this.technologies.map(skill => {
      const matches = skill.name.toLowerCase().includes(searchTerm) || 
                     skill.dataSkill.toLowerCase().includes(searchTerm);
      return {
        ...skill,
        visible: matches,
        highlighted: matches && searchTerm !== ''
      };
    });
    
    // Filtrar lenguajes
    this.filteredLanguages = this.languages.map(skill => {
      const matches = skill.name.toLowerCase().includes(searchTerm) || 
                     skill.dataSkill.toLowerCase().includes(searchTerm);
      return {
        ...skill,
        visible: matches,
        highlighted: matches && searchTerm !== ''
      };
    });
    
    // Filtrar soft skills
    this.filteredSoftSkills = this.softSkills.map(skill => {
      const matches = skill.name.toLowerCase().includes(searchTerm) || 
                     skill.dataSkill.toLowerCase().includes(searchTerm);
      return {
        ...skill,
        visible: matches,
        highlighted: matches && searchTerm !== ''
      };
    });

    // Mostrar mensaje si no hay resultados
    this.showNoResults = searchTerm !== '' && 
      this.filteredTechnologies.every(s => !s.visible) &&
      this.filteredLanguages.every(s => !s.visible) &&
      this.filteredSoftSkills.every(s => !s.visible);
    
    // Emitir cambio al componente padre
    this.skillSearchChange.emit(searchTerm);
  }

  clearSkillSearch() {
    this.skillSearchTerm = '';
    this.showNoResults = false;
    
    // Resetear todas las habilidades
    this.filteredTechnologies = this.technologies.map(skill => ({ ...skill, visible: true, highlighted: false }));
    this.filteredLanguages = this.languages.map(skill => ({ ...skill, visible: true, highlighted: false }));
    this.filteredSoftSkills = this.softSkills.map(skill => ({ ...skill, visible: true, highlighted: false }));
    
    // Emitir evento al componente padre
    this.clearSearch.emit();
  }
}