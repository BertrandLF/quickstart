import { Injectable } from '@angular/core';
import { Hero } from './hero'
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api, api is convention, heroes is name of db object
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 2000)
    });
  }

  getHero(id: number): Promise<Hero> {
    const heroUrl = `${this.heroesUrl}/${id}`
    return this.http.get(heroUrl)
                .toPromise()
                .then(response => response.json().data as Hero)
                .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const heroUrl = `${this.heroesUrl}/${hero.id}`
    return this.http.put(heroUrl, JSON.stringify(hero), this.headers)
                .toPromise()
                .then(() => hero)
                .catch(this.handleError)
  }
}
