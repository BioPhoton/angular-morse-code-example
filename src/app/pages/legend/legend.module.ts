import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LegendComponent} from './legend.component';
import {LegendRoutingModule} from './legend.routing.module';
import {SharedModule} from '../../shared/shared.module';

const COMPONENTS = [LegendComponent]

@NgModule({
  imports: [
    CommonModule,
    LegendRoutingModule,
    SharedModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class LegendModule { }
