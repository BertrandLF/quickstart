import { Component } from '@angular/core';
import { Hero } from '../common/hero';
import { HeroService } from '../common/hero.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/list/heroes.component.html',
  styleUrls: ['app/list/heroes.component.css'],
  providers: [HeroService]
})

export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService) { }
  selectedHero: Hero;
  heroes: Hero[];

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}

