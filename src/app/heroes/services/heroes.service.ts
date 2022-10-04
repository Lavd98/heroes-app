import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getHeroes(){
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroeById(id: string) {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${ id }`);
  }

  getSugerencias(term: string) {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${ term }&_limit=6`);
  }

  addHeroes(heroe: Heroe) {
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe)
  }

  updateHeroe(heroe: Heroe) {
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe)
  }

  deleteHeroe(id: string) {
    return this.http.delete(`${this.baseUrl}/heroes/${ id }`)
  }

}
