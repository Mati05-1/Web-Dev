import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

// Declarar moment para TypeScript
declare const moment: any;

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Saludo dinámico
  greeting = 'Hola Soy Matías Arroyo.';
  
  // Tema
  currentTheme = 'dark';
  themeIcon = '🌙';
  
  // Contacto
  contactIcon = '📧';
  contactButtonText = 'Contacto';
  
  // Eventos para comunicar con el componente padre
  @Output() contactToggle = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<void>();
  
  private greetingInterval: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateGreeting();
      this.greetingInterval = setInterval(() => this.updateGreeting(), 60000);
      this.loadTheme();
    }
  }

  ngOnDestroy() {
    if (this.greetingInterval) {
      clearInterval(this.greetingInterval);
    }
  }

  // Saludo dinámico
  updateGreeting() {
    if (isPlatformBrowser(this.platformId) && typeof moment !== 'undefined') {
      const hora = moment().hour();
      let saludo = "Hola";
      if (hora < 12) saludo = "¡Buenos días!";
      else if (hora < 18) saludo = "¡Buenas tardes!";
      else saludo = "¡Buenas noches!";
      this.greeting = saludo + " Soy Matías Arroyo.";
    }
  }

  // Funcionalidad de tema
  loadTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (prefersDark ? 'dark' : 'light');
      
      this.currentTheme = theme;
      document.body.setAttribute('data-theme', theme);
      this.updateThemeIcon(theme);
    }
  }

  updateThemeIcon(theme: string) {
    this.themeIcon = theme === 'dark' ? '🌙' : '☀️';
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', this.currentTheme);
      localStorage.setItem('theme', this.currentTheme);
      this.updateThemeIcon(this.currentTheme);
      this.themeToggle.emit();
    }
  }

  // Funcionalidad de contacto
  toggleContact() {
    if (this.contactIcon === '📧') {
      this.contactIcon = '❌';
      this.contactButtonText = 'Ocultar';
    } else {
      this.contactIcon = '📧';
      this.contactButtonText = 'Contacto';
    }
    this.contactToggle.emit();
  }
}