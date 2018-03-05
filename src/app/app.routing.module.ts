import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {MorseCodeDecodingModule} from './pages/morse-code-decoding/morse-code-decoding.module';
import {LegendComponent} from './pages/legend/legend.component';
import {MorseCodeDecodingComponent} from './pages/morse-code-decoding/morse-code-decoding.component';
import {LegendModule} from './pages/legend/legend.module';

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
    path: 'encode',
    component: MorseCodeDecodingComponent
  }
];

const extraOptions: ExtraOptions = {
  useHash: true
}

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, extraOptions),
    MorseCodeDecodingModule,
    LegendModule,
    MorseCodeDecodingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {
}
