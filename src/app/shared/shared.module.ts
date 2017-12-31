import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MorseButtonComponent} from './components/morse-button/morse-button.component';
import {MorseDisplayComponent} from './components/morse-display/morse-display.component';
import {MorseFrameComponent} from './components/morse-frame/morse-frame.component';
import {MorseSpeakerComponent} from './components/morse-speaker/morse-speaker.component';

const SHARED_COMPONENTS = [MorseFrameComponent, MorseButtonComponent, MorseDisplayComponent, MorseSpeakerComponent]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [SHARED_COMPONENTS],
  exports: [SHARED_COMPONENTS]
})
export class SharedModule {
}
