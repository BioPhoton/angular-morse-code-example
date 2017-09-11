import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
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

const extraOptions: ExtraOptions = {
  useHash: true
}

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, extraOptions),
    MorseCodeDecodingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {
}
