import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {MorseCodeProcessingModule} from './pages/morse-code-processing/morse-code-processing.module';

const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'legend'
  },
  {
    path: 'legend',
    loadChildren: 'app/pages/legend/legend.module#LegendModule'
  },
  {
    path: 'processing',
    loadChildren: 'app/pages/morse-code-processing/morse-code-processing.module#MorseCodeProcessingModule'
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
