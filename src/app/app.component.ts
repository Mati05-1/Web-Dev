import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';

// Declarar moment para TypeScript
declare const moment: any;

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterModule, HeaderComponent, ContactInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cv-angular-app';
  
  // Contacto
  contactVisible = false;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Inicialización del componente principal
  }

  ngOnDestroy() {
    // Cleanup del componente principal
  }

  // Funcionalidad de contacto
  toggleContact() {
    this.contactVisible = !this.contactVisible;
  }

  // Manejar cambio de tema desde el header
  onThemeToggle() {
    // El tema ya se maneja en el HeaderComponent
  }

  // Descargar HTML
  downloadHTML() {
    if (isPlatformBrowser(this.platformId)) {
      const contenido = document.documentElement.outerHTML;
      const blob = new Blob([contenido], { type: 'text/html' });
      const enlace = document.createElement('a');
      enlace.href = URL.createObjectURL(blob);
      enlace.download = 'mi_cv.html';
      enlace.click();
    }
  }
}
