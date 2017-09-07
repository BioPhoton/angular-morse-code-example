import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {MorseCodeDecodingRoutingModule} from './morse-code-decoding.routing.module';
import {MorseCodeDecodingComponent} from './morse-code-decoding.component';

const COMPONENTS = [MorseCodeDecodingComponent]

@NgModule({
  imports: [
    CommonModule,
    MorseCodeDecodingRoutingModule,
    SharedModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class MorseCodeDecodingModule {
}
