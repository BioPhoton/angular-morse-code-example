import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import {MorseCodeProcessingComponent} from './morse-code-processing.component';

const routes: Routes = [
  {
    path: '',
    component: MorseCodeProcessingComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MorseCodeProcessingRoutingModule { }
