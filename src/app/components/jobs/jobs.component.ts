import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Job } from '../../data.service';
import { ApiService, Experience } from '../../services/api.service';
import { ReversePipe } from '../../pipes/reverse.pipe';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, ReversePipe],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  basicJobs: string[] = [];
  apiExperiences: Experience[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private dataService: DataService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // Load jobs data from service
    this.jobs = this.dataService.getJobsData();
    this.basicJobs = this.dataService.getJobs();
    
    // Load experiences from API
    this.loadExperiencesFromAPI();
  }

  loadExperiencesFromAPI() {
    this.loading = true;
    this.error = null;
    
    this.apiService.getExperiences().subscribe({
      next: (experiences) => {
        this.apiExperiences = experiences;
        this.loading = false;
        console.log('Experiences loaded from API:', experiences);
      },
      error: (error) => {
        this.error = 'Error al cargar experiencias desde la API';
        this.loading = false;
        console.error('Error loading experiences:', error);
      }
    });
  }

  refreshData() {
    this.loadExperiencesFromAPI();
  }
}
