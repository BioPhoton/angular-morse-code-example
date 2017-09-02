import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LegendComponent} from './legend.component';

const routes: Routes = [
  {
    path: '',
    component: LegendComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegendRoutingModule { }
