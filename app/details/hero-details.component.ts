import { Component, Input } from '@angular/core'
import { Hero } from '../common/hero';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/details/hero.details.component.html',
  styleUrls: ['app/details/hero.details.component.css']
})

export class HeroDetailComponent {
  @Input()
  hero: Hero;
}
