import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from '../interfaces/hero';
import { MessageDialogService } from './message-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private url = 'api/heroes';
  private httpOptions;

  constructor(private http: HttpClient, private messagDialog: MessageDialogService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
   }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.url).pipe(
      catchError(this.handleError<Hero[]>(undefined))
    );
  }

  getHeroById(id: number): Observable<Hero> {
    const url = `${this.url}/${id}`;
    return this.http.get<Hero>(url).pipe(
      catchError(this.handleError<Hero>(undefined))
    );
  }

  searchHeroesByName(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.url}/?name=${term}`).pipe(
      catchError(this.handleError<Hero[]>(undefined))
    );
  }

  addHero(newHero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.url, newHero, this.httpOptions).pipe(
      catchError(this.handleError<Hero>(undefined))
    );
  }

  deleteHero(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      catchError(this.handleError<any>(undefined))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.url, hero, this.httpOptions).pipe(
      catchError(this.handleError<any>(undefined))
    );
  }


  //Handle Error
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.messagDialog.errorMessageDialog();
      return of(result as T);
    };
  }

}
