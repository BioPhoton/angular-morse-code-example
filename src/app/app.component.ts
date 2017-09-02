import {Component, Inject} from '@angular/core';
import {MorseTranslations} from './core/token/injection-tokens';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  navBarCollapsed = true;

  constructor(@Inject(MorseTranslations) public morseTranslations) {
  }


  toggleNav(closeOnly?: boolean) {
    if (closeOnly) {
      this.navBarCollapsed = true;
    } else {
      this.navBarCollapsed = !this.navBarCollapsed;
    }
  }

}
