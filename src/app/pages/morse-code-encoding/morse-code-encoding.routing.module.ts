import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import {MorseCodeEncodingComponent} from './morse-code-encoding.component'

const routes: Routes = [
  {
    path: '',
    component: MorseCodeEncodingComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MorseCodeEncodingRoutingModule { }
