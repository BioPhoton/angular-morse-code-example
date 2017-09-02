import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MorseCodeEncodingModule} from './pages/morse-code-encoding/morse-code-encoding.module';

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
    loadChildren: 'app/pages/morse-code-encoding/morse-code-encoding.module#MorseCodeEncodingModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES),
    MorseCodeEncodingModule
  ],
  exports: [
    RouterModule,
    MorseCodeEncodingModule
  ]
})
export class AppRouterModule {
}
