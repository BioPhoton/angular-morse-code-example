import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {MorseCodeProcessingModule} from './pages/morse-code-processing/morse-code-processing.module';
import {MorseCodeProcessingComponent} from './pages/morse-code-processing/morse-code-processing.component';
import {LegendComponent} from './pages/legend/legend.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'legend'
  },
  {
    path: 'legend',
    component: LegendComponent
  },
  {
    path: 'processing',
    component: MorseCodeProcessingComponent
  }
];

const extraOptions: ExtraOptions = {
  useHash: true
}

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, extraOptions),
    MorseCodeProcessingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {
}
