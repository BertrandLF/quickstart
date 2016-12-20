import { Component } from '@angular/core';
import { Hero } from './common/hero';
import { HeroService } from './common/hero.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
  providers: [HeroService]
})

export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  constructor(private heroService: HeroService) { }
  selectedHero: Hero;
  heroes: Hero[];

  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}

