import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MorseCodeDecodingModule} from './pages/morse-code-decoding/morse-code-decoding.module';

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
    path: 'encode',
    loadChildren: 'app/pages/morse-code-decoding/morse-code-decoding.module#MorseCodeDecodingModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES),
    MorseCodeDecodingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {
}
