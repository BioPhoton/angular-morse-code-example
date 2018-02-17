import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {MorseCodeProcessingComponent} from './morse-code-processing.component';
import {MorseCodeProcessingRoutingModule} from './morse-code-processing.routing.module';

const COMPONENTS = [MorseCodeProcessingComponent]

@NgModule({
  imports: [
    CommonModule,
    MorseCodeProcessingRoutingModule,
    SharedModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class MorseCodeProcessingModule {
}
