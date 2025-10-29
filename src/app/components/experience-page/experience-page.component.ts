import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-experience-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './experience-page.component.html',
  styleUrl: './experience-page.component.scss'
})
export class ExperiencePageComponent implements OnInit {
  ngOnInit() {
    // Inicialización del componente
  }
}
