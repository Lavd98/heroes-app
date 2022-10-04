import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth() {
    return {...this._auth}
  }

  constructor(
    private http: HttpClient
  ) { }

  verificaAuth(): Observable<boolean> {
    if ( !localStorage.getItem('token')){
      return of (false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      map( data => {
        this._auth = data;
        return true
      })
    );
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      tap( data => this._auth = data ),
      tap( data => localStorage.setItem('token', data.id) )
    );
  }

  logout() {
    this._auth = undefined;
  }
}
