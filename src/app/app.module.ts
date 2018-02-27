import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRouterModule} from './app.routing.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {LegendModule} from './pages/legend/legend.module';
import {MorseCodeProcessingModule} from './pages/morse-code-processing/morse-code-processing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    LegendModule,
    MorseCodeProcessingModule,
    SharedModule,
    CoreModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
