import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkillsComponent, Skill } from '../skills/skills.component';
import { DataService } from '../../data.service';

interface MemoryCard {
  value: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-skills-page',
  imports: [CommonModule, FormsModule, SkillsComponent],
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.scss'
})
export class SkillsPageComponent implements OnInit, OnDestroy {
  // Datos de habilidades desde el servicio
  technologies: Skill[] = [];
  languages: Skill[] = [];
  softSkills: Skill[] = [];
  basicSkills: string[] = [];

  // Game variables
  gameStarted = false;
  gameWon = false;
  score = 0;
  highScore = 0;
  
  // Memory game variables
  cards: MemoryCard[] = [];
  flippedCards: number[] = [];
  moves = 0;
  
  // Card values
  cardValues = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎵', '🎸', '🎺'];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Load high score from localStorage
    this.highScore = parseInt(localStorage.getItem('highScore') || '0');
    
    // Load skills data from service
    this.technologies = this.dataService.getTechnologies();
    this.languages = this.dataService.getLanguages();
    this.softSkills = this.dataService.getSoftSkills();
    this.basicSkills = this.dataService.getSkills();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  startGame() {
    this.gameStarted = true;
    this.gameWon = false;
    this.score = 0;
    this.moves = 0;
    this.flippedCards = [];
    
    // Create cards with pairs
    const pairs = [...this.cardValues, ...this.cardValues];
    this.shuffleArray(pairs);
    
    this.cards = pairs.map(value => ({
      value,
      flipped: false,
      matched: false
    }));
  }

  flipCard(index: number) {
    if (!this.gameStarted || this.gameWon) return;
    
    const card = this.cards[index];
    if (card.flipped || card.matched) return;
    
    card.flipped = true;
    this.flippedCards.push(index);
    
    if (this.flippedCards.length === 2) {
      this.moves++;
      this.score = this.moves;
      
      setTimeout(() => {
        this.checkMatch();
      }, 1000);
    }
  }

  checkMatch() {
    const [firstIndex, secondIndex] = this.flippedCards;
    const firstCard = this.cards[firstIndex];
    const secondCard = this.cards[secondIndex];
    
    if (firstCard.value === secondCard.value) {
      // Match found!
      firstCard.matched = true;
      secondCard.matched = true;
      
      // Check if game is won
      if (this.cards.every(card => card.matched)) {
        this.gameWon = true;
        if (this.score > this.highScore) {
          this.highScore = this.score;
          localStorage.setItem('highScore', this.highScore.toString());
        }
      }
    } else {
      // No match, flip back
      firstCard.flipped = false;
      secondCard.flipped = false;
    }
    
    this.flippedCards = [];
  }

  restartGame() {
    this.startGame();
  }

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
