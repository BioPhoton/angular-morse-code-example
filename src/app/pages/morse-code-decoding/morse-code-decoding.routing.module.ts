import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import {MorseCodeDecodingComponent} from './morse-code-decoding.component'

const routes: Routes = [
  {
    path: '',
    component: MorseCodeDecodingComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MorseCodeDecodingRoutingModule { }
