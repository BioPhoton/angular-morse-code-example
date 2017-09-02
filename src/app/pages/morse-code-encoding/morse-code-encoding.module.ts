import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {MorseCodeEncodingRoutingModule} from './morse-code-encoding.routing.module';
import {MorseCodeEncodingComponent} from './morse-code-encoding.component';

const COMPONENTS = [MorseCodeEncodingComponent]

@NgModule({
  imports: [
    CommonModule,
    MorseCodeEncodingRoutingModule,
    SharedModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class MorseCodeEncodingModule {
}
