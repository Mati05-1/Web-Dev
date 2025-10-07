import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsService, NBAPlayer, NBATeam, NBAGame } from '../../services/sports.service';

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.scss'
})
export class SportsComponent implements OnInit {
  // Datos de la NBA
  players: NBAPlayer[] = [];
  teams: NBATeam[] = [];
  recentGames: NBAGame[] = [];
  
  // Estados de carga
  loadingPlayers = true;
  loadingTeams = true;
  loadingGames = true;
  
  // Estados de error
  errorPlayers = '';
  errorTeams = '';
  errorGames = '';
  
  // Información de la página
  lastUpdated = '';
  
  // Configuración de paginación
  currentPage = 1;
  playersPerPage = 12;

  constructor(private sportsService: SportsService) {}

  ngOnInit() {
    this.loadSportsData();
  }

  async loadSportsData() {
    try {
      // Cargar datos en paralelo
      await Promise.all([
        this.loadPlayers(),
        this.loadTeams(),
        this.loadRecentGames()
      ]);
      
      this.lastUpdated = new Date().toLocaleString('es-ES');
    } catch (error) {
      console.error('Error loading sports data:', error);
    }
  }

  async loadPlayers() {
    try {
      this.loadingPlayers = true;
      this.errorPlayers = '';
      
      this.sportsService.getPlayers(this.currentPage, this.playersPerPage).subscribe({
        next: (response) => {
          this.players = response.data;
          this.loadingPlayers = false;
        },
        error: (error) => {
          console.error('Error loading players:', error);
          this.errorPlayers = 'No se pudieron cargar los jugadores';
          this.loadingPlayers = false;
        }
      });
    } catch (error) {
      this.errorPlayers = 'Error al conectar con la NBA API';
      this.loadingPlayers = false;
    }
  }

  async loadTeams() {
    try {
      this.loadingTeams = true;
      this.errorTeams = '';
      
      this.sportsService.getTeams().subscribe({
        next: (teams) => {
          this.teams = teams;
          this.loadingTeams = false;
        },
        error: (error) => {
          console.error('Error loading teams:', error);
          this.errorTeams = 'No se pudieron cargar los equipos';
          this.loadingTeams = false;
        }
      });
    } catch (error) {
      this.errorTeams = 'Error al conectar con la NBA API';
      this.loadingTeams = false;
    }
  }

  async loadRecentGames() {
    try {
      this.loadingGames = true;
      this.errorGames = '';
      
      this.sportsService.getRecentGames().subscribe({
        next: (games) => {
          this.recentGames = games.slice(0, 6); // Mostrar solo los últimos 6 juegos
          this.loadingGames = false;
        },
        error: (error) => {
          console.error('Error loading games:', error);
          this.errorGames = 'No se pudieron cargar los juegos';
          this.loadingGames = false;
        }
      });
    } catch (error) {
      this.errorGames = 'Error al conectar con la NBA API';
      this.loadingGames = false;
    }
  }

  // Métodos de utilidad
  formatHeight(feet: number | null, inches: number | null): string {
    return this.sportsService.formatHeight(feet, inches);
  }

  formatWeight(pounds: number | null): string {
    return this.sportsService.formatWeight(pounds);
  }

  formatGameDate(dateString: string): string {
    return this.sportsService.formatGameDate(dateString);
  }

  getTeamColor(abbreviation: string): string {
    return this.sportsService.getTeamColor(abbreviation);
  }

  // Métodos de navegación
  loadMorePlayers() {
    this.currentPage++;
    this.loadPlayers();
  }

  refreshData() {
    this.currentPage = 1;
    this.loadSportsData();
  }

  // Métodos de filtrado
  getPlayersByConference(conference: string): NBAPlayer[] {
    return this.players.filter(player => player.team.conference === conference);
  }

  getTeamsByConference(conference: string): NBATeam[] {
    return this.teams.filter(team => team.conference === conference);
  }

  getEasternConferenceTeams(): NBATeam[] {
    return this.getTeamsByConference('East');
  }

  getWesternConferenceTeams(): NBATeam[] {
    return this.getTeamsByConference('West');
  }
}
