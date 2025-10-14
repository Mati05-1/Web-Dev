import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Study } from '../../data.service';
import { ApiService, Education } from '../../services/api.service';
import { ReversePipe } from '../../pipes/reverse.pipe';

@Component({
  selector: 'app-studies',
  standalone: true,
  imports: [CommonModule, ReversePipe],
  templateUrl: './studies.component.html',
  styleUrl: './studies.component.scss'
})
export class StudiesComponent implements OnInit {
  studies: Study[] = [];
  apiEducation: Education[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private dataService: DataService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // Load studies data from service
    this.studies = this.dataService.getStudiesData();
    
    // Load education from API
    this.loadEducationFromAPI();
  }

  loadEducationFromAPI() {
    this.loading = true;
    this.error = null;
    
    this.apiService.getEducation().subscribe({
      next: (education) => {
        this.apiEducation = education;
        this.loading = false;
        console.log('Education loaded from API:', education);
      },
      error: (error) => {
        this.error = 'Error al cargar educación desde la API';
        this.loading = false;
        console.error('Error loading education:', error);
      }
    });
  }

  refreshData() {
    this.loadEducationFromAPI();
  }
}
