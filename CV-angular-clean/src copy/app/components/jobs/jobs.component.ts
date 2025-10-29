import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Job } from '../../data.service';
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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Load jobs data from service
    this.jobs = this.dataService.getJobsData();
    this.basicJobs = this.dataService.getJobs();
  }
}
