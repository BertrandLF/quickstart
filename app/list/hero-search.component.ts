import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import { Subject }            from 'rxjs/Subject';

import { HeroSearchService }  from '../service/hero-search.service';
import { Hero } from '../model/hero';

@Component({
  moduleId: module.id,
  selector: 'hero-search',
  templateUrl: 'hero-search.component.html',
  styleUrls: [ 'hero-search.component.css' ],
  providers: [ HeroSearchService ]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router) {}

  //push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    const noHeroes = Observable.of<Hero[]>([])
    this.heroes = this.searchTerms
        .debounceTime(300) //wait for 300ms not to trigger too many searches
        .distinctUntilChanged() //ignore if next term is the same as the previous
        .switchMap(term => term ? this.heroSearchService.search(term) : noHeroes)
        .catch(error => {
          console.log(error);
          return noHeroes;
        })
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}