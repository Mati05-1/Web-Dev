import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { SkillsPageComponent } from './components/skills-page/skills-page.component';
import { ExperiencePageComponent } from './components/experience-page/experience-page.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { StudiesComponent } from './components/studies/studies.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SportsComponent } from './components/sports/sports.component';

export const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'skills', component: SkillsPageComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'sports', component: SportsComponent },
  { 
    path: 'experience', 
    component: ExperiencePageComponent,
    children: [
      { path: '', redirectTo: 'jobs', pathMatch: 'full' },
      { path: 'jobs', component: JobsComponent },
      { path: 'studies', component: StudiesComponent }
    ]
  },
  { path: '**', redirectTo: '/about' } // Wildcard route for 404 handling
];
