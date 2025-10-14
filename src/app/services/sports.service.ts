import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface NBAPlayer {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number | null;
  height_inches: number | null;
  weight_pounds: number | null;
  team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
}

export interface NBATeam {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface NBAGame {
  id: number;
  date: string;
  home_team: NBATeam;
  visitor_team: NBATeam;
  home_team_score: number;
  visitor_team_score: number;
  season: number;
  period: number;
  status: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class SportsService {
  private readonly NBA_API_URL = 'https://www.balldontlie.io/api/v1';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene jugadores de la NBA
   */
  getPlayers(page: number = 1, perPage: number = 25): Observable<{ data: NBAPlayer[], meta: any }> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.get<any>(`${this.NBA_API_URL}/players?page=${page}&per_page=${perPage}`, { headers })
      .pipe(
        map(response => ({
          data: response.data || [],
          meta: response.meta || {}
        })),
        catchError(error => {
          console.error('Error fetching NBA players:', error);
          return of({ data: this.getFallbackPlayers(), meta: {} });
        })
      );
  }

  /**
   * Obtiene equipos de la NBA
   */
  getTeams(): Observable<NBATeam[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.get<any>(`${this.NBA_API_URL}/teams`, { headers })
      .pipe(
        map(response => response.data || []),
        catchError(error => {
          console.error('Error fetching NBA teams:', error);
          return of(this.getFallbackTeams());
        })
      );
  }

  /**
   * Obtiene juegos recientes de la NBA
   */
  getRecentGames(): Observable<NBAGame[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    // Obtener juegos de los últimos 7 días
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    return this.http.get<any>(`${this.NBA_API_URL}/games?start_date=${startDateStr}&end_date=${endDateStr}`, { headers })
      .pipe(
        map(response => response.data || []),
        catchError(error => {
          console.error('Error fetching NBA games:', error);
          return of(this.getFallbackGames());
        })
      );
  }

  /**
   * Obtiene estadísticas de un jugador específico
   */
  getPlayerStats(playerId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.get<any>(`${this.NBA_API_URL}/stats?player_ids[]=${playerId}&per_page=100`, { headers })
      .pipe(
        map(response => response.data || []),
        catchError(error => {
          console.error('Error fetching player stats:', error);
          return of([]);
        })
      );
  }

  /**
   * Datos de ejemplo para cuando la API falla
   */
  private getFallbackPlayers(): NBAPlayer[] {
    return [
      {
        id: 1,
        first_name: 'LeBron',
        last_name: 'James',
        position: 'F',
        height_feet: 6,
        height_inches: 9,
        weight_pounds: 250,
        team: {
          id: 14,
          abbreviation: 'LAL',
          city: 'Los Angeles',
          conference: 'West',
          division: 'Pacific',
          full_name: 'Los Angeles Lakers',
          name: 'Lakers'
        }
      },
      {
        id: 2,
        first_name: 'Stephen',
        last_name: 'Curry',
        position: 'G',
        height_feet: 6,
        height_inches: 2,
        weight_pounds: 185,
        team: {
          id: 9,
          abbreviation: 'GSW',
          city: 'Golden State',
          conference: 'West',
          division: 'Pacific',
          full_name: 'Golden State Warriors',
          name: 'Warriors'
        }
      },
      {
        id: 3,
        first_name: 'Kevin',
        last_name: 'Durant',
        position: 'F',
        height_feet: 6,
        height_inches: 10,
        weight_pounds: 240,
        team: {
          id: 25,
          abbreviation: 'PHX',
          city: 'Phoenix',
          conference: 'West',
          division: 'Pacific',
          full_name: 'Phoenix Suns',
          name: 'Suns'
        }
      }
    ];
  }

  private getFallbackTeams(): NBATeam[] {
    return [
      {
        id: 1,
        abbreviation: 'ATL',
        city: 'Atlanta',
        conference: 'East',
        division: 'Southeast',
        full_name: 'Atlanta Hawks',
        name: 'Hawks'
      },
      {
        id: 2,
        abbreviation: 'BOS',
        city: 'Boston',
        conference: 'East',
        division: 'Atlantic',
        full_name: 'Boston Celtics',
        name: 'Celtics'
      },
      {
        id: 3,
        abbreviation: 'BKN',
        city: 'Brooklyn',
        conference: 'East',
        division: 'Atlantic',
        full_name: 'Brooklyn Nets',
        name: 'Nets'
      },
      {
        id: 14,
        abbreviation: 'LAL',
        city: 'Los Angeles',
        conference: 'West',
        division: 'Pacific',
        full_name: 'Los Angeles Lakers',
        name: 'Lakers'
      },
      {
        id: 9,
        abbreviation: 'GSW',
        city: 'Golden State',
        conference: 'West',
        division: 'Pacific',
        full_name: 'Golden State Warriors',
        name: 'Warriors'
      }
    ];
  }

  private getFallbackGames(): NBAGame[] {
    return [
      {
        id: 1,
        date: '2024-01-15T00:00:00.000Z',
        home_team: {
          id: 14,
          abbreviation: 'LAL',
          city: 'Los Angeles',
          conference: 'West',
          division: 'Pacific',
          full_name: 'Los Angeles Lakers',
          name: 'Lakers'
        },
        visitor_team: {
          id: 9,
          abbreviation: 'GSW',
          city: 'Golden State',
          conference: 'West',
          division: 'Pacific',
          full_name: 'Golden State Warriors',
          name: 'Warriors'
        },
        home_team_score: 120,
        visitor_team_score: 115,
        season: 2023,
        period: 4,
        status: 'Final',
        time: ''
      },
      {
        id: 2,
        date: '2024-01-14T00:00:00.000Z',
        home_team: {
          id: 2,
          abbreviation: 'BOS',
          city: 'Boston',
          conference: 'East',
          division: 'Atlantic',
          full_name: 'Boston Celtics',
          name: 'Celtics'
        },
        visitor_team: {
          id: 3,
          abbreviation: 'BKN',
          city: 'Brooklyn',
          conference: 'East',
          division: 'Atlantic',
          full_name: 'Brooklyn Nets',
          name: 'Nets'
        },
        home_team_score: 108,
        visitor_team_score: 102,
        season: 2023,
        period: 4,
        status: 'Final',
        time: ''
      }
    ];
  }

  /**
   * Formatea la altura de un jugador
   */
  formatHeight(feet: number | null, inches: number | null): string {
    if (feet === null || inches === null) return 'N/A';
    return `${feet}'${inches}"`;
  }

  /**
   * Formatea el peso de un jugador
   */
  formatWeight(pounds: number | null): string {
    if (pounds === null) return 'N/A';
    return `${pounds} lbs`;
  }

  /**
   * Formatea la fecha de un juego
   */
  formatGameDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Obtiene el color del equipo basado en su abreviación
   */
  getTeamColor(abbreviation: string): string {
    const colors: { [key: string]: string } = {
      'LAL': '#552583', // Lakers purple
      'GSW': '#1D428A', // Warriors blue
      'BOS': '#007A33', // Celtics green
      'BKN': '#000000', // Nets black
      'ATL': '#E03A3E', // Hawks red
      'PHX': '#1D1160', // Suns purple
      'MIA': '#98002E', // Heat red
      'CHI': '#CE1141', // Bulls red
      'NYK': '#006BB6', // Knicks blue
      'PHI': '#006BB6'  // 76ers blue
    };
    return colors[abbreviation] || '#6c757d';
  }
}
