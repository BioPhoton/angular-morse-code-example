import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MorseFrameComponent } from './components/morse-frame/morse-frame.component';
import {MorseDisplayComponent} from './components/morse-display/morse-display.component';
import {MorseButtonComponent} from './components/morse-button/morse-button.component';

const SHARED_COMPONENTS = [MorseFrameComponent, MorseButtonComponent, MorseDisplayComponent]
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SHARED_COMPONENTS],
  exports: [SHARED_COMPONENTS]
})
export class SharedModule { }
