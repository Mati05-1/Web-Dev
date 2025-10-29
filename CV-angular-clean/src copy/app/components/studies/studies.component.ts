import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Study } from '../../data.service';
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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Load studies data from service
    this.studies = this.dataService.getStudiesData();
  }
}
