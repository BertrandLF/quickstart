import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../common/hero';
import { HeroService } from '../common/hero.service';
import { OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css'],
  providers: [HeroService]
})

export class HeroesComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

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

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: String): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => { this.heroes.push(hero); })
  }
}

